from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Error(Base):
    __tablename__ = 'CGI_Database.Errors'
    _id = Column(String, primary_key=True)
    datetime = Column(String)
    machineID = Column(String)
    errorID = Column(String)

class Failure(Base):
    __tablename__ = 'CGI_Database.Failures'
    _id = Column(String, primary_key=True)
    datetime = Column(String)
    machineID = Column(String)
    failure = Column(String)

class Machine(Base):
    __tablename__ = 'CGI_Database.Machines'
    _id = Column(String, primary_key=True)
    machineID = Column(String)
    model = Column(String)
    age = Column(String)

class Maintenance(Base):
    __tablename__ = 'CGI_Database.Maint'
    _id = Column(String, primary_key=True)
    datetime = Column(String)
    machineID = Column(String)
    comp = Column(String)

class Telemetry(Base):
    __tablename__ = 'CGI_Database.V1'
    _id = Column(String, primary_key=True)
    datetime = Column(String)
    machineID = Column(String)
    volt = Column(String)
    rotate = Column(String)
    pressure = Column(String)
    vibration = Column(String)