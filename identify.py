import sys
import ast
import os

import joblib

dirname = os.path.dirname(__file__)

machine_learning_model_path = os.path.join(dirname, 'LRModel.pkl')

input = sys.argv[1]
if not isinstance(input, str):
    input = ast.literal_eval( input)
model = joblib.load(machine_learning_model_path)

result = model.predict([ input ])

#print(f'Result predicted for {input} as {result} for sql injection ')
print( result[0] )
sys.stdout.flush()