from django.shortcuts import render
# Make sure to install this using pip install requests on terminal
import requests


# Version-1: This version makes an AJAX request in JavaScript
def index(request):
    return render(request, 'yelp/index.html')


# Version-2: This version uses Python library requests to make an AJAX request
def index_v2(request):
    # if the request method is a post
    if request.method == 'POST':
        # get the search term and location
        search_term = request.POST.get('search_term')
        location = request.POST.get('location')

        # this is the url to access the endpoint yelp along with 2 parameters search term and location
        # more details can be found here https://www.yelp.com/developers/documentation/v3/business_search
        url = f'https://api.yelp.com/v3/businesses/search?term={search_term}&location={location}'
        headers = {
            "Authorization": "Bearer R2gFPcNg1KkOib427cLS6AoTewOjhyBG25hO02kJA-kg5JG4WUSFQD-w0BP588FkVFpbPliemjEjs_NYXUjDfiBNX_hAmGz78tD47dB0XF39AA99irMsBM1UGfzCX3Yx"
        }

        response = requests.get(url, headers=headers)
        data = response.json()
        total_results = data['total']
        businesses = data['businesses']
        return render(request, 'yelp/index-v2.html', {'businesses': businesses, 'total_results': total_results})
    else:
        return render(request, 'yelp/index-v2.html')
