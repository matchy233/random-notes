#!/usr/bin/env python3

# read temp.txt
# create a pandat dataframe
# write the dataframe into markdown style table

#%%
import pandas as pd

# read temp.txt
with open('temp.txt', 'r') as f:
    # strip the \n
    data = [ line.strip() for line in f.readlines() ]

# every 5 lines is a group
# create a panda dataframe
# header is "title", "published time", "other info", "language", "english title"
# write the 5 lines into a row
#%%
df = pd.DataFrame([data[i:i+5] for i in range(0, len(data), 5)])
df.columns = ['title', 'published time', 'other info', 'language', 'english title']

# drop "published time", "other info" and "language"
#%%
df = df.drop(['published time', 'other info', 'language'], axis=1)

#%%
# write the dataframe into markdown style table
with open('temp.md', 'w') as f:
    f.write(df.to_markdown())
