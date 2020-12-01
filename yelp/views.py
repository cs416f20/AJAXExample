from django.shortcuts import render
import requests

# Create your views here.
#def index(request):
#    return render(request, 'yelp/index.html')

def index(request):
    url = 'https://api.yelp.com/v3/businesses/search?term=pizza&location=boston'
    headers = {"Authorization": "Bearer R2gFPcNg1KkOib427cLS6AoTewOjhyBG25hO02kJA-kg5JG4WUSFQD-w0BP588FkVFpbPliemjEjs_NYXUjDfiBNX_hAmGz78tD47dB0XF39AA99irMsBM1UGfzCX3Yx"}

    response = requests.get(url, headers=headers)
    data = response.json()
    total_results = data['total']
    businesses = data['businesses']
    return render(request, 'yelp/index-2.html', {'businesses': businesses})



