import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import tickerSymbols from "../../Assets/tickers.json";

const Accordion = withStyles({
  root: {
    boxShadow: "0 0 20px 5px rgba(194, 200, 228, 0.4)",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    display: "grid",
    backgroundColor: "white",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          Show Company List
        </AccordionSummary>
        <AccordionDetails>
          <div className="company-list">
            {props.stocks.map((x, index) => {
              let obj = tickerSymbols.find(
                (o) => o.Symbol === x.replace(/ /g, "")
              );
              if (obj) {
                return (
                  <div className="dashboard-list">
                    <div className="number-list">{`${props.percent[index]}%`}</div>
                    <div className="title-list">{obj.Name}</div>
                  </div>
                );
              }
              return (
                <div className="dashboard-list">
                  <div className="number-list">{`${props.percent[index]}%`}</div>
                  <div className="title-list">
                    <i>name not found</i>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
