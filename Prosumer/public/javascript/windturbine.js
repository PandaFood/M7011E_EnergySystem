let windConfig = {
    scrollY: '40vh',
    scrollCollapse: true,
    paging: false
};
let windTable = $('#wind-table').DataTable(windConfig);

function openTurbineModal() {
    modal = $('#create-windturbine-modal');

    modal.show();


    let closeButton = modal.find('.btn-close-modal');

    closeButton.on('click', function () {
        modal.hide();
    });
}

function addWindRow(id, data) {
    turbine = $('#template-turbine-row').clone();
    turbine.addClass('turbine-row');
    turbine.attr('id', id);
    turbine.show()
    windTable.row.add(turbine).draw();

    turbine.on('click', function (e) {
        window.open('/wind?id=' + id, '_blank');
    });

    updateWindRow(id, data);
}

function updateWindRow(id, data) {
    turbine = $('#' + id);

    turbine.find('.turbine-name').html(data.name);

    if (data.status == 'running') {
        turbine.find('.turbine-speed').html(data.speed + ' m/s');
        turbine.find('.turbine-production').html(data.power + ' kWh');
        turbine.find('.turbine-status').html('<i class="fas fa-blender-phone"></i> ' + data.status);
    } else {
        turbine.find('.turbine-speed').html('---');
        turbine.find('.turbine-production').html('---');
        turbine.find('.turbine-status').html('<i class="fas fa-exclamation-circle"></i> ' + data.status);
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


$('#btn-create-wind').on('click', function (e) {
    openTurbineModal();
});

$(document).ready(function () {
    let id = uuidv4();
    for (let i = 0; i < 10; i++) {
        if (i === 0) {
            data = {
                name: 'awert',
                speed: 10,
                power: 20,
                status: 'running'
            }
            addWindRow(id, data);
        } else {
            data = {
                name: 'wasd' + i,
                speed: 10,
                power: 20,
                status: 'running'
            }
            addWindRow(uuidv4(), data);
        }
    }

    setInterval(function () {
        let updateValues = {
            speed: Math.floor(Math.random() * 15),
            power: Math.floor(Math.random() * 20),
            status: 'running'
        }

        updateWindRow(id, updateValues);
    }, 1000);
});