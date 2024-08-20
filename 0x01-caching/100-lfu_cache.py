#!/usr/bin/env python3
""" LFUCache module """
from base_caching import BaseCaching
from collections import defaultdict, OrderedDict


class LFUCache(BaseCaching):
    """ LFUCache defines a LFU caching system """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.cache_data = OrderedDict()
        self.frequency = defaultdict(int)

    def put(self, key, item):
        """ Add an item in the cache """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_key = min(self.frequency,
                              key=lambda k: (self.frequency[k], k))
                print(f"DISCARD: {lfu_key}")
                del self.cache_data[lfu_key]
                del self.frequency[lfu_key]
            self.cache_data[key] = item
            self.frequency[key] += 1

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            self.frequency[key] += 1
            return self.cache_data[key]
        return None
