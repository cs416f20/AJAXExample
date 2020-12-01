$(document).ready(function () {
    $('button').click(function () {

        //This API enables cross-origin requests to anywhere
        // This will probably be very confusing for you to understand as to why we need another url in front of the actual url
        // However, browsers like Chrome prevents non-cross-origin requests, so this is a workaround for that
        corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';

        $.ajax({
            url: corsAnywhereURL + 'https://api.yelp.com/v3/businesses/search',
            dataType: 'json',
            data: {'term': 'pizza', 'location': 'boston'},
            method: 'GET',
            headers: {
                'Authorization':'Bearer R2gFPcNg1KkOib427cLS6AoTewOjhyBG25hO02kJA-kg5JG4WUSFQD-w0BP588FkVFpbPliemjEjs_NYXUjDfiBNX_hAmGz78tD47dB0XF39AA99irMsBM1UGfzCX3Yx',
            },
            success: function(data) {
                //console.log(data);
                // Grab the results from the API JSON return
                const totalResults = data.total;
                console.log(totalResults);
                // If our results are greater than 0, continue
                if (totalResults > 0){
                    // Display a header on the page with the number of results
                    $('#results').append('<h5>We discovered ' + totalResults + ' results!</h5>');
                    // Itirate through the JSON array of 'businesses' which was returned by the API
                    $.each(data.businesses, function(i, item) {
                        // Store each business's object in a variable
                        const id = item.id;
                        const alias = item.alias;
                        const phone = item.display_phone;
                        const image = item.image_url;
                        const name = item.name;
                        const rating = item.rating;
                        const reviewcount = item.review_count;
                        const address = item.location.address1;
                        const city = item.location.city;
                        const state = item.location.state;
                        const zipcode = item.location.zip_code;
                        // Append our result into our page
                        $('#results').append('' +
                            '<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;">' +
                            '<img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
                  });
                } else {
                    // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                    $('#results').append('<h5>We discovered no results!</h5>');
                }

            }
        });
    });
});