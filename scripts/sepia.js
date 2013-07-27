self.addEventListener('message', function (e) {
    var imagen = e.data.img.data;
    for (k = 0; k < imagen.length; k += 4) {
        imagen[k] = (imagen[k] * 0.593 + imagen[k + 1] * 0.769 + imagen[k + 2] * 0.189);
        if (imagen[k] > 255) imagen[k] = 255;
        imagen[k + 1] = (imagen[k] * 0.349 + imagen[k + 1] * 0.686 + imagen[k + 2] * 0.168);
        if (imagen[k + 1] > 255) imagen[k] = 255;
        imagen[k + 2] = (imagen[k] * 0.272 + imagen[k + 1] * 0.534 + imagen[k + 2] * 0.131);
        if (imagen[k + 2] > 255) imagen[k] = 255;
    }

    e.data.img.data = imagen;
    self.postMessage(e.data.img);
    self.close();
}, false);