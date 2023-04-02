import sys
import ast

import joblib

input = sys.argv[1]
if not isinstance(input, str):
    input = ast.literal_eval( input)
model = joblib.load('LRModel.pkl')

result = model.predict([ input ])

#print(f'Result predicted for {input} as {result} for sql injection ')
print( result[0] )
sys.stdout.flush()