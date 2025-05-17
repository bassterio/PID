$(document).ready(function() {
    $('#descripcion').summernote({
        placeholder: 'Escribe aquí...',
        height: 150,
        toolbar: [
            ['font', ['fontname']],
            ['style', ['bold', 'italic', 'underline']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['paragraph']]
        ],
        fontNames: [
            'Arial', 'Times New Roman', 
            'Courier New', 'Verdana', 
            'Georgia'
        ],
        fontSizes: ['8', '10', '12', '14', '18'],
        colors: [
            ['#000000', '#434343', '#666666', '#999999', '#cccccc'],
            ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff'],
            ['#0000ff', '#9900ff', '#ff00ff', '#ff0033', '#FF5733'],
            ['#957cb2', '#45b8ac', '#d0c101', '#f28123', '#eb0a0a'],
            ['#ffffff', '#f1f1f1', '#f8f8f8', '#fcfcfc', '#e6e6e6']
        ]
    });

    function validarFechas() {
        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();
        let valido = true;
        
        if (fechaInicio && fechaFin) {
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            
            if (inicio > fin) {
                $('#fechaInicio').removeClass('is-valid').addClass('is-invalid');
                $('#fechaFin').removeClass('is-valid').addClass('is-invalid');
                $('#fechaFin').next('.invalid-feedback').text('La fecha de inicio no puede ser posterior a la fecha final');
                valido = false;
            } else {
                $('#fechaInicio').removeClass('is-invalid').addClass('is-valid');
                $('#fechaFin').removeClass('is-invalid').addClass('is-valid');
                $('#fechaFin').next('.invalid-feedback').text('');
            }
        }
        return valido;
    }

    $('input').on('input change', function() {
        if ($(this).val()) {
            $(this).removeClass('is-invalid').addClass('is-valid');
            $(this).next('.invalid-feedback').text('');
        } else {
            $(this).removeClass('is-valid');
        }
    });

    $('.btn-cerrar').click(function() {
        if (confirm('¿Estás seguro de que quieres cerrar el formulario?')) {
            window.close();
        }
    });

    $('.btn-minimizar').click(function() {
        $('.contenido-formulario').slideToggle();
    });

    $('.btn-cancelar').click(function() {
        if (confirm('¿Deseas cancelar y descartar los cambios?')) {
            $('#formReup')[0].reset();
            $('#descripcion').summernote('reset');
            $('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
            $('.invalid-feedback').text('');
        }
    });

    $('.btn-aplicar').click(function() {
        if (validarFormulario() && validarFechas()) {
            const datos = obtenerDatosFormulario();
            console.log("Datos aplicados:", datos);
            alert("Cambios aplicados correctamente");
        }
    });

    $('#formReup').submit(function(e) {
        e.preventDefault();
        if (validarFormulario() && validarFechas()) {
            const datos = obtenerDatosFormulario();
            console.log("Datos guardados:", datos);
            alert("Formulario guardado correctamente");
        }
    });

    function validarFormulario() {
        let valido = true;
        $('input[required]').each(function() {
            if (!$(this).val()) {
                $(this).removeClass('is-valid').addClass('is-invalid');
                valido = false;
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });
        return valido && validarFechas();
    }

    function obtenerDatosFormulario() {
        return {
            denominacion: $('#denominacion').val(),
            codigoReup: $('#codigoReup').val(),
            abreviatura: $('#abreviatura').val(),
            fechaInicio: $('#fechaInicio').val(),
            fechaFin: $('#fechaFin').val(),
            propio: $('#propio').is(':checked'),
            descripcion: $('#descripcion').summernote('code')
        };
    }
});