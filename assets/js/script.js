$("#update_user").submit(function(event){
    event.preventDefault();
    var users = $(this).serializeArray();
    console.log(users);
    var data ={}

   $.map(users,function(n,i){
    console.log(n)
    data[n["name"]] = n["value"]
   })

    console.log(data);

    $.ajax({
        "url" : `http://localhost:8080/api/user/${data.id}`,
        "method" : "PUT",
        "data" : data
    })
    alert("Done")
})