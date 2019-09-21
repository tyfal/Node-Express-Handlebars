$(function() {
    $(`.change-devoured`).on(`click`, function(event) {

        var id = $(this).data(`id`);

        var newDevoured = $(this).data(`newdevoured`);

        var newDevouredState = {
            devoured: newDevoured
        };

        // Put request
        $.ajax(`/api/burgers/${id}`, {
            type: `PUT`,
            data: newDevouredState
        }).then(() => {
            // console.log(`changed to ${newDevoured}`);
            location.reload();
        });
    });


    $(`.create-form`).on(`submit`, function(event) {
        event.preventDefault();

        var newBurger = {
            name: $(`#new-burger-name`).val().trim(),
            devoured: $(`[name=new-devoured]:checked`).val().trim()
        };

        console.log(newBurger);

        $.ajax(`/api/burgers`, {
            type: `POST`,
            data: newBurger
        }).then(() => {
            console.log(`DA BERGER!`);
            location.reload();
        });

    });

});