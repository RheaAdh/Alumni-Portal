import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import Nav from "../components/Nav";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

const Members = () => {
  const auth = useAuth();
  //stores all users
  const [users, setUsers] = useState([]);
  //stores a pair of key(type of filter) and values
  const [filter, setFilter] = useState([]);

  //stores users who satisfy any one of the chosen filters
  const [filteredArray, setFilteredArray] = useState([]);

  //General
  const [username, setName] = useState("");
  const [college, setCollege] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [company, setCompany] = useState("");
  const [prevCompany, setPrevCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [prevDesignation, setPrevDesignation] = useState("");
  const [yearsOfExp, setYearsOfExp] = useState(0);
  const [location, setLocation] = useState("");
  const [house, setHouse] = useState("");

  //Get all users
  useEffect(() => {
    axios({
      method: "get",
      url: "https://primus-alumni-portal.herokuapp.com/api/users/getall",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log(result.data.data);
        setUsers(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(filter);
    let ppl = [];
    for (let i = 0; i < filter.length; i++) {
      console.log("filter[i] where i is", i);
      var key = filter[i].key;
      var value = filter[i].value;
      var searchTerm;
      switch (key) {
        case "username":
          users.filter((user) => {
            searchTerm = user.username;
            if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
              if (!ppl.includes(user)) ppl.push(user);
              else {
                console.log("ppl mai its ther");
              }
            }
          });
          break;
        case "college":
          users.filter((user) => {
            searchTerm = user.college;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "gradYear":
          users.filter((user) => {
            searchTerm = user.gradYear;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "prevCompany":
          users.filter((user) => {
            searchTerm = user.prevCompany;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "house":
          users.filter((user) => {
            searchTerm = user.house;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "yearsOfExp":
          users.filter((user) => {
            searchTerm = user.yearsOfExp;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "location":
          users.filter((user) => {
            searchTerm = user.location;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "designation":
          users.filter((user) => {
            searchTerm = user.designation;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });
          break;
        case "prevDesignation":
          users.filter((user) => {
            searchTerm = user.prevDesignation;
            if (!searchTerm) {
              console.log("empty search term");
            } else {
              if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
                if (!ppl.includes(user)) ppl.push(user);
                else {
                  console.log("ppl mai its ther");
                }
              }
            }
          });

          break;
        default:
          console.log("oops");
          break;
      }
    }

    setFilteredArray(ppl);
  }, [filter]);

  useEffect(() => {
    console.log("filtered array:");
    console.log(filteredArray);
  }, [filteredArray]);

  return (
    <div>
      <Nav />
      <div className="community">
        <center>
          <b>Search for alumni using the below input fields</b>
        </center>
        <div className="inputGrid">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (username)
                setFilter([...filter, { value: username, key: "username" }]);
            }}
          >
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (college)
                setFilter([...filter, { value: college, key: "college" }]);
            }}
          >
            <input
              type="text"
              placeholder="College"
              onChange={(e) => setCollege(e.target.value)}
            ></input>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (gradYear)
                setFilter([...filter, { value: gradYear, key: "gradYear" }]);
            }}
          >
            <input
              type="text"
              placeholder="Grad Year"
              onChange={(e) => setGradYear(e.target.value)}
            ></input>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (company)
                setFilter([...filter, { value: company, key: "company" }]);
            }}
          >
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setCompany(e.target.value)}
            ></input>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (prevCompany)
                setFilter([
                  ...filter,
                  {
                    value: prevCompany,
                    key: "prevCompany",
                  },
                ]);
            }}
          >
            <input
              type="text"
              placeholder="Previous Company"
              onChange={(e) => setPrevCompany(e.target.value)}
            ></input>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (house)
                setFilter([
                  ...filter,
                  {
                    value: house,
                    key: "house",
                  },
                ]);
            }}
          >
            <input
              type="text"
              placeholder="House Name"
              onChange={(e) => setHouse(e.target.value)}
            ></input>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (yearsOfExp)
                setFilter([
                  ...filter,
                  {
                    value: yearsOfExp,
                    key: " yearsOfExp",
                  },
                ]);
            }}
          >
            <input
              type="text"
              placeholder="Experience"
              onChange={(e) => setYearsOfExp(e.target.value)}
            ></input>
          </form>

          <form
            onSubmit={(e) => {
              if (location !== null) e.preventDefault();
              if (location)
                setFilter([...filter, { value: location, key: "location" }]);
            }}
          >
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </form>
          <form
            onSubmit={(e) => {
              if (designation !== null) e.preventDefault();
              if (designation)
                setFilter([
                  ...filter,
                  {
                    value: designation,
                    key: "designation",
                  },
                ]);
            }}
          >
            <input
              type="text"
              placeholder="Designation"
              onChange={(e) => setDesignation(e.target.value)}
            ></input>
          </form>

          <form
            onSubmit={(e) => {
              if (prevDesignation !== null) e.preventDefault();
              setFilter([
                ...filter,
                {
                  value: prevDesignation,
                  key: "prevDesignation",
                },
              ]);
            }}
          >
            <input
              type="text"
              placeholder="Previous Designation"
              onChange={(e) => setPrevDesignation(e.target.value)}
            ></input>
          </form>
        </div>
        <center>
          <div className="filters">
            <div className="filterItems">
              {filter.length == 0 ? (
                <div style={{ color: "grey" }}>No filters applied.</div>
              ) : (
                filter.map((x) => <span>{x.value}</span>)
              )}
            </div>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setFilter([]);
              }}
            >
              Clear All
            </Button>
            <br /> <br />
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {filter.length == 0
                  ? users.map((x, index) => (
                      <Grid item xs={4} sm={4} md={4} key={index}>
                        <UserCard user={x} />
                      </Grid>
                    ))
                  : filteredArray.map((x, index) => (
                      <Grid item xs={4} sm={4} md={4} key={index}>
                        <UserCard user={x} />
                      </Grid>
                    ))}
              </Grid>
            </Box>
            <br /> <br />
          </div>
        </center>
      </div>
    </div>
  );
};

export default Members;
