let tags = [{
    tag: "kreboblueb",
}, ];

document.querySelector(".btn-block").onclick = () => {
    if (navigator.onLine) {
        if (confirm("Apakah formulir yang anda isikan sudah benar?")) {
            kirim();
            // alert('Bisa');
        }
    } else {
        alert(
            "Anda tidak terhubung ke internet. Silakan periksa koneksi internet anda."
        );
    }
};

function kirim() {
    let field1 = $("#fname").val();
    let field2 = $("#fgender").val();
    let field3 = $("#email").val();
    let alamat = $("#adr").val();
    let field5 = $("#kontak").val();
    let field6 = $("#komen").val();
    let field7 = JSON.parse(localStorage.getItem("productsInCart"));
    let field8 = localStorage.getItem("totalCost");
    let barang = "";


    for (let i = 0; i < products.length; i++) {
        if (field7[tags[i].tag] != undefined) {
            let namabar = field7[tags[i].tag].name;
            let harga_satu = field7[tags[i].tag].price;
            let dicart = field7[tags[i].tag].inCart;
            barang += dicart + " " + namabar + " = " + harga_satu * dicart + "\n";
        }
    }

    if (field1.length <= 2) {
        alert("Mohon isikan nama anda");
        document.getElementById("fname").focus();
        return false;
    }
    if (field2 == "") {
        alert("Mohon isi jenis kelamin");
        document.getElementById("fgender").focus();
        return false;
    }
    if (field3 <= 3) {
        alert("Mohon isi email");
        document.getElementById("email").focus();
        return false;
    }
    if (alamat <= 10) {
        alert(
            "Mohon isi alamat selengkap mungkin termasuk warna rumah dan informasi detail lainnya"
        );
        document.getElementById("adr").focus();
        return false;
    }
    if (field5 <= 2) {
        alert("Mohon isi kontak yang dapat dihubungi");
        document.getElementById("kontak").focus();
        return false;
    }


    $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSea44b1D1xjL9DZk3djTiUqUpwz0cz5J99UAwSvm7ccCSnTGg/formResponse",
        data: {
            "entry.1099095195": field1,
            "entry.1191371516": field2,
            "entry.1399726387": field3,
            "entry.530018619": alamat,
            "entry.698706937": field5,
            "entry.1118356181": field6,
            "entry.1376478902": barang,
            "entry.1451004195": field8,
        },
        type: "POST",
        dataType: "xml",
        // onLoad: alert('proses bung...'),
        complete: function () {
            removeAllPembelian();
            alert(
                "Formulir anda berhasil dikirim, silakan tunggu balasan dari kami pada kontak yang telah anda isikan"
            );
        },
    });

    // alert('Permintaan anda sedang diproses\nSilakan tekan OK');
}

function removeAllPembelian() {
    localStorage.setItem("cartNumbers", 0);
    localStorage.setItem("totalCost", 0);
    localStorage.setItem("productsInCart", 0);
}