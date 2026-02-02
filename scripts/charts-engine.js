const Charts = {
  instances: [],
  destroyAll() {
    Charts.instances.forEach(c => c.destroy());
    Charts.instances = [];
  }
};

function makeBarChart(canvasId, labels, values, labelName) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: labelName,
        data: values
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });

  Charts.instances.push(chart);
}

function makeDoughnut(canvasId, labels, values, labelName) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        label: labelName,
        data: values
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });

  Charts.instances.push(chart);
}
