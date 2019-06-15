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

    print(qResults)

    data_json = qResults.to_json(orient='records')

    # Return a list of the NOCs
    return data_json
    # return jsonify("This is it!")


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


# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)

if __name__ == "__main__":
    app.run()
