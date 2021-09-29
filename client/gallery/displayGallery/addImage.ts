// import { getPage } from './helpers/getPage';

const imgForm = <HTMLFormElement>document.querySelector('.sendImg');

imgForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const uploadImg: Response = await fetch(`http://127.0.0.1:2000/gallery`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        },
        body: new FormData(imgForm),
    })

    const uploadResult = await uploadImg.json();

    if (uploadImg.status !== 200) {
        alert(uploadResult.errorMessage);
        return;
    }

    alert(`${uploadResult.message}\nЗагружены следующие изображения:\n${uploadResult.objects.join('\n')}`);
    window.location.reload();
});
