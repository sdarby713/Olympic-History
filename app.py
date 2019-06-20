import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/olympic-history.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
medals = Base.classes.medals
NOC = Base.classes.NOC
olympiad = Base.classes.olympiad

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of NOC names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(NOC).statement
    qResults = pd.read_sql_query(stmt, db.session.bind)

    # print(qResults)

    data_json = qResults.to_json(orient='records')

    # Return a list of the NOCs
    return data_json
    # return jsonify("This is it!")

@app.route("/olympiads")
def years():
    """Return a list of NOC names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(olympiad).statement
    qResults = pd.read_sql_query(stmt, db.session.bind)

    # print(qResults)

    data_json = qResults.to_json(orient='records')

    # Return the olympiad data
    return data_json

@app.route("/medals/<selFrDate>/<selToDate>/<selNOC>/<selSport>")
def samples(selFrDate, selToDate, selNOC, selSport):
    stmt = db.session.query(medals).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # YNS is just there to provide a primary key; real data is elsewhere
    del df["YNS"]

    selFrDate = int(selFrDate)
    selToDate = int(selToDate)

    # Filter the data based on the date range
    df = df.loc[df["Year"] >= selFrDate, :]
    df = df.loc[df["Year"] <= selToDate, :]

    # Filter the data based on NOC
    if (selNOC != "All")  :
        df = df.loc[df["NOC"] == selNOC, :]

    # Filter the data based on Sport
    if (selSport != "All")  :
        df = df.loc[df["Sport"] == selSport, :]

    # Format the data to send as json
    data_json = df.to_json(orient='records')
 
    return data_json
    # return jsonify(sorted_df)


if __name__ == "__main__":
    app.run()
