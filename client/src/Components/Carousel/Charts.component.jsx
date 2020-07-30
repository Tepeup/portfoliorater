import React from "react";

import Carousel from "react-bootstrap/Carousel";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

class CarouselChart extends React.Component {
  constructor(visible) {
    super(visible);
    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    const stockState = {
      labels: this.props.stockLabels,

      datasets: [
        {
          data: this.props.stockData,
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
            "#1652f0",
            "#e6194b",
            "#3cb44b",
            "#ffd8b1",
            "#808080",
            "#f58231",
            "#911eb4",
            "#ffe119",
            "#e6beff",
            "#9a6324",
            "#fffac8",
            "#800000",
            "#aaffc3",
            "#808000",
            "#bcf60c",
            "#fabebe",
            "#008080",
          ],
          legend: {
            display: true,
          },
          options: {
            maintainAspectRatio: false,
          },
        },
      ],
    };
    const capState = {
      labels: this.props.capLabels,

      datasets: [
        {
          data: this.props.capData,
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
            "#1652f0",
            "#e6194b",
            "#3cb44b",
            "#ffd8b1",
            "#808080",
            "#f58231",
            "#911eb4",
            "#ffe119",
            "#e6beff",
            "#9a6324",
            "#fffac8",
            "#800000",
            "#aaffc3",
            "#808000",
            "#bcf60c",
            "#fabebe",
            "#008080",
          ],
          legend: {
            display: true,
          },
          options: {
            maintainAspectRatio: false,
          },
        },
      ],
    };
    const sectorState = {
      labels: this.props.sectorLabels,

      datasets: [
        {
          data: this.props.sectorData,
          borderWidth: 2,
          borderColor: "#FFF",
          hoverBorderWidth: 3,
          hoverBorderColor: "#FFF",
          backgroundColor: [
            "#1652f0",
            "#e6194b",
            "#3cb44b",
            "#ffd8b1",
            "#808080",
            "#f58231",
            "#911eb4",
            "#ffe119",
            "#e6beff",
            "#9a6324",
            "#fffac8",
            "#800000",
            "#aaffc3",
            "#808000",
            "#bcf60c",
            "#fabebe",
            "#008080",
          ],
          legend: {
            display: true,
          },
          options: {
            maintainAspectRatio: false,
          },
        },
      ],
    };
    return (
      <Carousel interval={null}>
        <Carousel.Item>
          <div id="item" className="fixthis">
            <Pie
              data={stockState}
              options={{
                title: {
                  display: true,
                  text: "My Portfolio",
                  fontSize: 24,
                  fontColor: "black",
                },
                responsive: true,
                maintainAspectRatio: false,
                animateRotate: true,
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem, data) {
                      let label = data.labels[tooltipItem.index];
                      let value = data.datasets[0].data[tooltipItem.index];
                      return `${label}: ${value}%`;
                    },
                  },
                },

                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    boxWidth: 20,
                    padding: 5,
                  },
                },
              }}
            />
          </div>{" "}
        </Carousel.Item>
        <Carousel.Item>
          <div id="item" className="fixthis">
            <Doughnut
              data={sectorState}
              options={{
                title: {
                  display: true,
                  text: "GICS Sector",
                  fontSize: 24,
                  fontColor: "black",
                },
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                animateRotate: true,
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem, data) {
                      let label = data.labels[tooltipItem.index];
                      let value = data.datasets[0].data[tooltipItem.index];
                      return `${label}: ${value}%`;
                    },
                  },
                },

                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    boxWidth: 20,
                    padding: 5,
                    filter: function (legendItem, data) {
                      return legendItem.index < 12;
                    },
                  },
                },
              }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div id="item" className="fixthis">
            {" "}
            <Bar
              data={capState}
              options={{
                title: {
                  display: true,
                  text: "Market Capitalization",
                  fontSize: 24,
                  fontColor: "black",
                },

                scales: {
                  xAxes: [
                    {
                      display: true,
                      gridLines: { display: false },
                      categoryPercentage: 0.9,
                      barPercentage: 0.9,
                    },
                  ],
                  yAxes: [
                    {
                      display: false,
                      gridLines: { display: false },
                      categoryPercentage: 1.0,
                      barPercentage: 0.8,
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                borderWidth: 0,
                responsive: true,
                maintainAspectRatio: false,
                animateRotate: true,
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem, data) {
                      let value = data.datasets[0].data[tooltipItem.index];
                      return `${value}%`;
                    },
                  },
                },

                legend: {
                  display: false,
                  position: "bottom",
                },
              }}
            />
          </div>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default CarouselChart;
