document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const filesInput = document.getElementById("files");
  const files = filesInput.files;
  const progressBar = document.getElementById("progressBar");
  const message = document.getElementById("message");

  if (!files.length) {
    message.textContent = "Nenhum arquivo selecionado.";
    return;
  }

  const formData = new FormData();
  for (let file of files) {
    formData.append("files", file);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3333/upload", true);

  xhr.upload.addEventListener("loadstart", () => {
    progressBar.classList.remove("hidden");
    progressBar.value = 0;
    message.textContent = "";
  });

  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      progressBar.value = percent;
    }
  });

  xhr.onload = () => {
    progressBar.classList.add("hidden");

    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText);
        const downloadUrl = response.url;

        // Copia o link para a área de transferência
        navigator.clipboard
          .writeText(downloadUrl)
          .then(() => {
            message.innerHTML = `
            <span class="text-green-600 font-medium">Upload realizado com sucesso!</span><br>
            Link copiado: <a href="${downloadUrl}" class="text-blue-600 underline" target="_blank">${downloadUrl}</a>
          `;
          })
          .catch(() => {
            message.innerHTML = `
            <span class="text-green-600 font-medium">Upload realizado com sucesso!</span><br>
            <a href="${downloadUrl}" class="text-blue-600 underline" target="_blank">${downloadUrl}</a>
          `;
          });
      } catch (err) {
        message.textContent = "Upload feito, mas a resposta não pôde ser lida.";
      }
    } else {
      message.textContent = "Erro ao enviar arquivos.";
    }
  };

  xhr.onerror = () => {
    progressBar.classList.add("hidden");
    message.textContent = "Erro na conexão com o servidor.";
  };

  xhr.send(formData);
});
