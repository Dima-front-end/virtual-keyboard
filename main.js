const xhr = new XMLHttpRequest();

xhr.open('GET', 'template.html', true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Вставляем содержимое файла в DOM нового HTML файла
    document.body.innerHTML = xhr.responseText;

    // Создаем новый элемент script и задаем ему атрибуты src и type
    const script = document.createElement('script');
    script.src = 'keyboard.js';
    script.type = 'text/javascript';

    // Вставляем скрипт в DOM
    document.head.appendChild(script);
  }
};

xhr.send();