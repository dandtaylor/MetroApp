from sklearn import base
from sklearn.pipeline import Pipeline
from sklearn import preprocessing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import ShuffleSplit, GridSearchCV
from sklearn.externals import joblib

import pickle
import heapq


metro_loc_flat = pickle.load(open('static/metro_loc_flat.p', 'r'))
census_dict = pickle.load(open('static/census_dict.p', 'r'))
bike_loc = pickle.load(open("static/bike_location.p", "rb"))

class LatLongTransformer(base.BaseEstimator, base.TransformerMixin):
    
    def __init__(self, metro_loc_flat = metro_loc_flat, census = census_dict, bike_loc = bike_loc):
        self.metro_loc_flat = metro_loc_flat
        self.bike_loc = bike_loc
        self.census = census
        
    def n_closest_metro_distance(self, x, n):
        """this will return the distance to the n closest metro stations"""
        h = []
        for k2, v2 in self.metro_loc_flat.items():
            heapq.heappush(h, vincenty((x[0], x[1]), v2).miles)
        return sorted(heapq.nsmallest(n, h))[:n]

    def n_closest_bike_distance(self, x, n):
        """this will return the distance to the n closest bike stations"""
        h = []
        for k2, v2 in self.bike_loc.items():
            temp = vincenty((x[0], x[1]), v2).miles 
            if temp > 0:
                heapq.heappush(h, temp)
        return sorted(heapq.nsmallest(n, h))[:n]

    def closest_census_tract(self, lat, lon, prop = ['pop_dens', 'hu_dens']): 
        """this will return the prop value for the closest census tract
        this function will need to be updated to make it more general for property names"""
        h = []
        for k,v in self.census.items():
            dist = vincenty((lat, lon),(v['INTPTLAT'], v['INTPTLONG'])).miles
            heapq.heappush(h, (dist, v[prop[0]], v[prop[1]], k))
        return [heapq.nsmallest(1,h)[0][1], heapq.nsmallest(1,h)[0][2]]
        
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        """This needs a list of tuples even if only one location is being transformed
        e.g. X = [(latitude, longitude)]"""
        features_all = []
        
        for ii in X:
            features = []
            features.extend(self.n_closest_metro_distance(ii, 2)) # metro 2
            features.extend(self.n_closest_bike_distance(ii, 8)) # 1st nearest bike stand
            features.extend(self.closest_census_tract(ii[0], ii[1])) # population and housing density
            features_all.append(features)
        
        return features_all



#if __name__ == '__main__':
