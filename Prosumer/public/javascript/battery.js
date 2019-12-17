let batteryConfig = {
    scrollY: '40vh',
    scrollCollapse: true,
    paging: false
};

let batteryTable = $('#battery-table').DataTable(batteryConfig);

function addBatteryRow(id, data) {
    battery = $('#template-battery-row').clone();
    battery.addClass('battery-row');
    battery.attr('id', id);

    battery.show()
    batteryTable.row.add(battery).draw();

    battery.on('click', function () {
        // open new tab for displaying battery data
    });

    updateBatteryRow(id, data);
}

function updateBatteryRow(id, data) {
    turbine = $('#' + id);

    battery.find('.battery-name').html(data.name);
    battery.find('.battery-capacity').html(data.cap + ' kWh');
    battery.find('.battery-max').html(data.max + ' kWh');
    battery.find('.battery-fill').html(data.fill + ' %');
}

$(document).ready(function () {


    for (let i = 0; i < 20; i++) {
        data = {
            name: 'wasd' + i,
            cap: 20,
            max: 30,
            fill: 80
        }
        addBatteryRow(uuidv4(), data);
    }

});