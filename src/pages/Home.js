import { ReactComponent as Logo } from "../assets/bin.svg";
import React from "react";
import meetings from '../data.js'
import { Link } from "react-router-dom";
import { ReactComponent as SearchLogo } from "../assets/search.svg"

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      searchQueries: {
        searchtext: [],
        startDate: '',
        endDate: Date.now(),
      },
      values: {
        startTime: '',
        endTime: '',
        date: '',
        name: '',
        nop: 0,
      }
    }
  }

  getFormattedDate = (date) => {
    function pad(inputTime) { return (inputTime < 10) ? '0' + inputTime : inputTime; }
    var d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  getFormattedTime = (inputTime) => {
    let t = inputTime.split(':');
    let h = parseInt(t[0]);
    const suff = h < 12 ? "AM" : "PM";
    const hr = h > 12 ? h - 12 : h;
    return `${h}:${t[1]} ${suff}`;
  }

  clearAll = () => {
    this.setState({
      list: meetings,
      values: {
        startTime: '',
        endTime: '',
        date: '',
        name: '',
        nop: 0,
      },
      searchQueries: {
        searchtext: [],
        startDate: '',
        endDate: Date.now(),
      },
    })
  }

  addToList(values) {
    let newList = [];
    if(values.name !== "" && values.nop !== "" && values.date !== "" && values.startTime !== "" && values.endTime !== "") {
      let val = {
        name: values.name,
        nop: values.nop,
        date: this.getFormattedDate(values.date),
        startTime: this.getFormattedTime(values.startTime),
        endTime: this.getFormattedTime(values.endTime),
      }
      newList = newList.concat(this.state.list, val);
      this.setState({
        list: newList,
        values: {
          startTime: '',
          endTime: '',
          date: '',
          name: '',
          nop: 0,
        },
        searchQueries: {
          searchtext: [],
          startDate: '',
          endDate: Date.now(),
        },
      });
    }
  }

  searchList(queries) {
    let searchResults = [];
    if (queries.searchtext !== "") {
      this.state.list.forEach((element) => {
        if (element.name.includes(queries.searchtext)) {
          searchResults.push(element);
        }
      });
    }
    console.log(queries.startDate);
    console.log(queries.endDate);
    if (queries.startDate !== "" && queries.endDate !== "") {
      this.state.list.forEach((element) => {
        var d = element.date.split("/");
        var date = new Date(d[2], parseInt(d[1]) - 1, d[0]);
        var startDate = new Date(queries.startDate);
        var endDate = new Date(queries.endDate);
        if (date > startDate && date < endDate) searchResults.push(element);
      })
    }
    this.setState({ list: searchResults });
  }

  deleteItem = (item) => {
    let newList = [];
    const itemIndex = this.state.list.indexOf(item);
    if (itemIndex === -1) {
      newList = newList.concat(this.state.list, item);
    } else if (itemIndex === 0) {
      newList = newList.concat(this.state.list.slice(1));
    } else if (itemIndex === this.state.list.length - 1) {
      newList = newList.concat(this.state.list.slice(0, -1));
    } else if (itemIndex > 0) {
      newList = newList.concat(
        this.state.list.slice(0, itemIndex),
        this.state.list.slice(itemIndex + 1)
      );
    }
    this.setState({ list: newList });
  }

  componentDidMount() {
    this.setState({ list: meetings });
  }

  render() {
    return (
      <div className="main-div">
        <h1>My Meetings</h1>
        <div className="search-div">
          <div>
            <SearchLogo fill='black' className="icon" />
            <input
              className="text-input"
              value={this.state.searchQueries.searchtext}
              placeholder="Search"
              style={{ paddingLeft: "20px" }}
              onChange={(e) => {
                this.setState({
                  searchQueries: {
                    ...this.state.searchQueries,
                    searchtext: e.target.value
                  }
                });
                this.searchList(this.state.searchQueries);
              }}>
            </input>
          </div>
          <div className="date-picker">
            From:<input
              type="date"
              className="date-input"
              value={this.state.searchQueries.startDate}
              onChange={(e) => {
                this.setState({
                  searchQueries: {
                    ...this.state.searchQueries,
                    startDate: e.target.value
                  }
                })
              }}>
            </input>
          </div>
          <div className="date-picker">
            To: <input
              type="date"
              className="date-input"
              value={this.state.searchQueries.endDate}
              onChange={(e) => {
                this.setState({
                  searchQueries: {
                    ...this.state.searchQueries,
                    endDate: e.target.value
                  }
                });
                this.searchList(this.state.searchQueries);
              }}>
            </input>
          </div>
          <div>
            <button
              className="addButton"
              onClick={() => {
                this.setState({ list: meetings })
              }}>
              <Link to="#" className="linkText">Clear
              </Link>
            </button>
          </div>
        </div>
        <div className="list-div">
          <table cellSpacing="20px" className="this.state.list-table">
            <thead>
              <tr>
                <th className="td">Sl. no</th>
                <th className="td">Meeting Name</th>
                <th className="td">No. of People attending</th>
                <th className="td">Date</th>
                <th className="td">Start time</th>
                <th className="td">End time</th>
                <th className="td">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="td">{index + 1}</td>
                    <td className="td">{item.name}</td>
                    <td className="td">{item.nop}</td>
                    <td className="td">{item.date}</td>
                    <td className="td">{item.startTime}</td>
                    <td className="td">{item.endTime}</td>
                    <td className="td" style={{ textAlign: "center" }}>
                      <Link to="#"><Logo fill='red' onClick={() => this.deleteItem(item)} /></Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <input
            className="text-input"
            style={{ marginLeft: "150px" }}
            value={this.state.values.name}
            onChange={(e) => {
              this.setState({
                values: {
                  ...this.state.values,
                  name: e.target.value
                }
              })
            }}>
          </input>
          <input
            className="text-input"
            type="number"
            style={{ marginLeft: "40px" }}
            value={this.state.values.nop}
            onChange={(e) => {
              this.setState({
                values: {
                  ...this.state.values,
                  nop: parseInt(e.target.value)
                }
              })
            }}></input>
          <input
            type="date"
            className="date-input"
            style={{ marginLeft: "60px", width: "100px", fontSize: "10px" }}
            value={this.state.values.date}
            onChange={(e) => {
              this.setState({
                values: {
                  ...this.state.values,
                  date: e.target.value
                }
              })
            }}
          ></input>
          <input
            type="time"
            className="date-input"
            style={{ marginLeft: "40px", width: "80px", fontSize: "11px" }}
            value={this.state.values.startTime}
            onChange={(e) => {
              this.setState({
                values: {
                  ...this.state.values,
                  startTime: e.target.value
                }
              })
            }}
          ></input>
          <input
            type="time"
            className="date-input"
            style={{ marginLeft: "50px", width: "80px", fontSize: "11px" }}
            value={this.state.values.endTime}
            onChange={(e) => {
              this.setState({
                values: {
                  ...this.state.values,
                  endTime: e.target.value
                }
              })
            }}
          ></input>
          <button type="submit" className="addButton" onClick={() => this.addToList(this.state.values)}>
            <Link to="#" className="linkText">Add</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Home;