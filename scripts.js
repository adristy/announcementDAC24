document.addEventListener('DOMContentLoaded', () => {
    let database = [];

    // Fetch data from JSON file
    fetch('datasemifinal.json')
        .then(response => response.json())
        .then(data => {
            database = data;
            console.log(database); // Pastikan data diambil dengan benar
        })
        .catch(error => console.error('Error fetching the JSON data:', error));

    const announcementForm = document.querySelector('.input-form');
    const resultDiv = document.createElement('div');
    const titleElement = document.querySelector('.title'); // Elemen title untuk "ELIMINATION ROUND"

    resultDiv.id = 'result';
    resultDiv.style.color = 'white';
    resultDiv.style.marginTop = '10px';
    document.querySelector('.announcement-section').appendChild(resultDiv);

    // Event listener untuk submit form
    announcementForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomorPesertaInput = document.getElementById('nomor-peserta').value.trim();

        // Validasi input apakah berupa angka
        if (!/^\d+$/.test(nomorPesertaInput)) {
            resultDiv.innerHTML = '<p class="error" style="font-size: 14px; color: red;">Nomor Peserta harus berupa angka.</p>';
            return;
        }

        // Cek apakah NoPeserta ada di database
        const team = database.find(entry => entry.NoPeserta.toString() === nomorPesertaInput);

        // Sembunyikan form dan title setelah submit
        if (titleElement) {
            titleElement.style.display = 'none';
        }
        announcementForm.style.display = 'none';

        // Atur tampilan resultDiv setelah submit
        resultDiv.style.textAlign = 'left';

        if (team) {
            const nilai = team.Nilai; // Ambil nilai dari database
            if (team.Keterangan === "Lolos") {
                resultDiv.innerHTML = `
                    <h1>Hello, <span style="color: #f3d127;">${team.NamaTim}</span> !</h1>
                    <h3><strong class="approve">Congratulations!</strong>  You've advanced to the Semifinals of DAC 2024!</strong></h3>
                    <p>Please contact one of our committee in 1x24 hour to confirm your participation in DAC 2024 semifinal.<br><br>
                    <strong>Raihan Abiyyu Briantama</strong><br>
                    WhatsApp: <a href="https://wa.me/6282116132950">0821 1613 2950</a><br>
                    <strong>Gilang Hanif Hendrawan</strong><br>
                    WhatsApp: <a href="https://wa.me/6288803505896">0888 0350 5896</a>
                    </p>
                    <p><em>See you soon in Surabaya</em> ^-^</p>
                `;
            } else if (team.Keterangan === "Tidak") {
                resultDiv.innerHTML = `
                    <h1>Hello, <span style="color: #f3d127;">${team.NamaTim}</span> !</h1>
                    <h3><span class="reject">Unfortunately,</span>  we were unable to select you as a Semifinalist.</h3>
                    <p>We hope to see you participate in future DAC events!</p>
                    <p><em>We do like to wish your tim good luck for the future and hope you will reach your success soon!</em></p>
                `;
            } else if (team.Keterangan === "Waiting") {
                resultDiv.innerHTML = `
                    <h1>Hello, <span style="color: #f3d127;">${team.NamaTim}</span> !</h1>
                    <h3>You're currently on the <span class="waiting" style="font-style: italic;">Waiting List</span> for DAC 2024.</h3>
                    <p>We'll notify if a spot becomes available.</p>
                    <p><em>Please wait for the good news until <strong>24th September 2024, at 23:59</strong></em> ^-^</p>
                `;
            }
        } else {
            resultDiv.innerHTML = `
                <h1>Sorry!</h1>
                <p>The team’s code you entered <strong style="color: red;">doesn't match our records.</strong>. Please re-check your spelling and try again.</p>
                <p>If you think this is a mistake, please contact </p>
                <p>
                    <strong>Gladys Akiko</strong><br>
                    WhatsApp: <a href="https://wa.me/62895622746334">+62 895-6227-46334</a><br>
                    <strong>Nabila Sinta</strong><br>
                    WhatsApp: <a href="https://wa.me/628113420305">+62 811-3420-305</a><br>
                </p>
            `;
        }
    });

    // Fungsi untuk mengubah gambar footer berdasarkan lebar layar
    function updateFooterImage() {
        const footerImage = document.querySelector('.footer img');
        if (window.innerWidth <= 767) {
            footerImage.src = 'images/footermobile.png';
        } else {
            footerImage.src = 'images/footer.svg';
        }
    }

    // Panggilan awal
    updateFooterImage();

    // Dengarkan perubahan ukuran layar
    window.addEventListener('resize', updateFooterImage);
});
