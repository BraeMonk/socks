from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/page1')
def home():
    return render_template('page1.html')

@app.route('/products')
def home():
    return render_template('products.html')

@app.route('/findout')
def home():
    return render_template('findout.html')

@app.route('/bananacat')
def home():
    return render_template('bananacat.html')

@app.route('/welcome')
def home():
    return render_template('welcome.html')

@app.route('/youdied')
def home():
    return render_template('youdied.html')

@app.route('/index2')
def home():
    return render_template('index2.html')

@app.route('/khajiitonly')
def home():
    return render_template('khajiitonly.html')

@app.route('/friend')
def home():
    return render_template('friend.html')

@app.route('/muchlove')
def home():
    return render_template('muchlove.html')

@app.route('/nonothing')
def home():
    return render_template('nonothing.html')

@app.route('/NOPE')
def home():
    return render_template('NOPE.html')

@app.route('/hell')
def home():
    return render_template('hell.html')

@app.route('/index3')
def home():
    return render_template('index3.html')

@app.route('/thefaceofgod')
def home():
    return render_template('thefaceofgod.html')

@app.route('/')
def static_files(filename):
return send_from_directory('/', filename)

@app.route('/')
def home():
    images = [
        '033C1A18-0CA3-4692-82A4-3D30236D7924.gif',
        '20C5D30F-8593-45FC-981F-957BA8977EB4.jpeg',
        '24E04E1C-1A19-4665-B29A-12E44CCF9B33.jpeg',
        '27E6DF11-2745-4D40-AF93-7D3797D24640.gif',
        '31B3D079-007B-4942-A4F2-47F2A1A8284F.jpeg',
        '34D08A7A-CA13-42C9-AC0E-2AC45476853C.jpeg',
        '49A2E1FD-38EC-4414-B63C-74214F1ED0FB.png',
        '4EB7D54F-AD67-4A84-BE2D-E534EF2A8DDD.gif',
        '512C259B-8A6D-48E1-A203-C4F4FAF89B15.webp',
        '5B2C9A72-6089-40C0-B303-03EC4D252C8D.gif',
        '66D1641F-BD34-42B5-B76B-314145521B4E.png',
        '687A2F0F-39F1-4974-B7B9-D5855CC008C6.webp',
        '69983E32-DC94-4113-A4EA-7D63211E78E7.jpeg',
        '6A28E3B1-D7D7-4E37-ABD4-B5DAEF05951F.png',
        '895CAEE7-4A9E-448A-B1FB-4A2194038C84.gif',
        '95E734E4-10C4-4AF3-BD96-E810C6F08792.png',
        'E2B16528-D1A2-4A13-BACF-D2618052FF42.gif',
        'EBADBB2E-50B0-4FDC-9AB9-8561D8AB3D4A.jpeg',
        'FB0DA456-23ED-49EF-8363-204A9013D991.jpeg',
        'FFE9A47F-C02C-4257-A103-565D15F12E3B.gif',
        'Hey you, youre finally awake.mp3',
        'IMG_0714.GIF',
        'IMG_0745.GIF',
        'IMG_0749.GIF',
        'IMG_0758.GIF',
        'OIP (1).jpg',
        'OIP.jpg',
        'Png.png',
        'e02ce86bcfd6d1d6c2f775af-b3ec8c01_w200.gif',
        'copy_CC503455-85B5-4062-9BE7-63934BA0A505.gif'
    ]
    return render_template('index.html', images=images)

@app.route('/static/<filename>')
def static_files(filename):
    response = make_response(send_from_directory('static', filename))
    response.headers['Cache-Control'] = 'public, max-age=31536000'  # Cache for one year
    return response

if __name__ == '__main__':
    app.run(debug=True)
