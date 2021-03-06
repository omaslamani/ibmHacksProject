# Copyright 2021 cameronbrown
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route("/templates/map.js")
def map_js():
    return send_from_directory('static', path = 'map.js')

@app.route("/templates/style.css")
def style_css():
    return send_from_directory('static', path = 'style.css')

@app.route("/assets/solar_points.json")
def solar_points():
    return send_from_directory('static', path = 'solar_points.json')