# Time report for Gustav


Date | Time spent (h) | Feature
--- | --- | ---
19-11-06 | 1h | feature
19-11-08 | 5h | Simulate Wind and Power 
19-11-09 | 1h | Test Wind and Power simulation
19-11-12 | 3.5h | Create Houses with Windturbines defined by a config file
19-11-12 | 3h | Simulate power consumption and power generation for a house. Calculate how much power can be sold or how much needs to be bought
19-11.12 | 0.5h | Test House simulation
19-11-14 | 4h | Simulate the power network with buying and selling power
19-11-15 | 2h | Simulate wind turbine breakdown
19-11-18 | 2h | Simulate a Coal Plant that can be started and stoped via the API
19-11-20 | 4h | Add houses and batteries to the database via the API
19-11-25 | 6h | Write extra assignment on security
19-11-26 | 4h | Work on a windsimulation based on Perlin Noise
19-11-27 | 1h | Write extra assignment on security
19-11-27 | 0.5h | Work on a windsimulation based on Perlin Noise
19-11-28 | 2h | Finishing WindSimulation by moving the noise generation to the backend and using it in the actual simulation
19-12-02 | 2h | Began looking into graph libraries for the Prosumer, chose AmCharts
19-12-03 | 3h | Implemented a Gauge to visualize battery storage with a slider to increase and decrease the fill percentage
12-12-05 | 2h | Implemented a line graph for displaying values over time 
19-12-09 | 5h | Work on website layout 
19-12-11 | 3h | Tweaking website layout and work on popup modal
19-12-12 | 1h | Architectural design discussion with Jonathan
19-12-13 | 2h | More work with the basic layout, open a new tab for displaying wind data 
19-12-19 | 1h | Tweak simulation parameters
19-12-19 | 4h | Load new batteries/turbines if added during runtime, let manager controll price via the api, add max capacity to coal plant
19-12-20 | 4h | Begun to move the dashboard from EJS to Vue
19-12-21 | 1h | Add tables for batteries as well
19-12-27 | 2h | Fetch turbines and batteries and add them to the table
19-12-28 | 1h | Added houses to the Simulator again and updated tests
19-12-28 | 3h | Load turbine data into a graph
19-12-28 | 1h | update current state fields by polling the api
19-12-30 | 2h | Show current wind data in turbine tab, update values in real time
19-12-30 | 1h | Open a new tab for displaying battery data
20-01-02 | 6h | Add graph for batteries, fix GUI updates in real time, update API, remade how batteries work in the simulation
20-01-03 | 4h | Allow user to create new Wind Turbines, minor tweaks
20-01-05 | 3h | Allow user to create new Batteries, Add better error responses from the API, more tweaks
20-01-06 | 3h | Remade how the Coalplant handles batteries, add more style to buttons, began work on flash messages
20-01-07 | 2h | Style flash messages and add them where they should be in the prosumer
20-01-09 | 6h | Began work on the Manager Control Panel
20-01-10 | 2h | Set price via Manager Control Panel, update styles
20-01-11 | 3h | Calculate when a blackout occurs, tweaking styles
20-01-12 | 1h | Show in the manager when a user have a blackout. Update flash messages
20-01-12 | 1h | Fix small broken stuff