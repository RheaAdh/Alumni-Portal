import * as React from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { TOKEN_ID } from "../utils/constants";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";

const Gallery = () => {
  const [items, setItems] = React.useState([]);
  const auth = useAuth();
  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://primus-alumni-portal.herokuapp.com/api/admin/getdrivelink",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log(result.data.data);
        setItems(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="gallery">
        {items.map((item) => (
          <Card style={{ width: "80%", margin: "0.5rem" }}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          35 people have confirmed
        </Typography> */}
              <Typography variant="h5" component="div">
                <b> {item.title}</b>
              </Typography>
              <br />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Drive Link :{" "}
                <a href={item.driveLink} style={{ color: "blue" }}>
                  {item.driveLink}
                </a>
              </Typography>

              {auth.user.isAdmin ? (
                <CardActions>
                  <button
                    style={{
                      backgroundColor: "red",
                      fontSize: "bold",
                      color: "white",
                      padding: "0.5rem",
                    }}
                    onClick={() => {
                      console.log("linkid:", item._id);
                      axios({
                        method: "delete",
                        url: `https://primus-alumni-portal.herokuapp.com/api/admin/deletedrivelink/${item._id}`,
                        headers: {
                          "Content-type": "application/json",
                          "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
                        },
                      })
                        .then((result) => {
                          console.log("result");
                          console.log(result.data);
                          if (result.data.success) {
                            console.log(result.data.data);
                            setItems(result.data.data);
                          }
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    Delete Link
                  </button>
                </CardActions>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
