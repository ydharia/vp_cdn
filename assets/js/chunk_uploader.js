function load_uploader(browse_button, error_disp_class, folder_name, url="team/upload_file", file_allowd=[], file_allowd_err="")
{
    var datafile = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        // browse_button : 'uploadFile', // you can pass in id...
        browse_button : browse_button, // you can pass in id...
        container: document.getElementById('docform'), // ... or DOM Element itself
        chunk_size: '3mb',
        // unique_names:true,
        // url : base_url + 'chat/uploadtoserver',
        url : base_url + url,
        max_file_count: 1,

        //ADD FILE FILTERS HERE
        filters : {
            /*mime_types: [
                    {title : "XML files", extensions : "xml"},
                ]
            */
        },

        // Flash settings
        flash_swf_url : base_url + '/assets/admin/plugins/plupload/Moxie.swf',

        // Silverlight settings
        silverlight_xap_url : base_url + '/assets/admin/plugins/plupload/Moxie.xap',
        
        init: {
            PostInit: function() {
                // document.getElementById('filelist').innerHTML = '';
                // document.getElementById('upload').onclick = function() {
                // datafile.start();
                // 	return false;
                // };
                // alert("init");
                // $("#send_file").on("change",function(){
                // 	alert("file select");
                // 	var allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.ms-office', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'video/mp4', 'video/avi', 'video/m4v', 'video/mov', 'video/mpg', 'video/mpeg', 'video/wmv', 'video/x-ms-wmv', 'video/quicktime'];
                // 	var file = this.files[0];
                // 	var fileType = file.type;
                // 	alert(file.type);
                // 	if(!allowedTypes.includes(fileType)){
                // 		alert('Please select a valid file (TXT/PDF/DOC/DOCX/JPEG/JPG/PNG/GIF/Video).');
                // 		$("#send_file").val('');
                // 		return false;
                // 	} else {
                // 		$(".sendfile_btn").parent().attr("style", "pointer-events:none;");
                // 		$(".sendfile_btn").html("<i class='fa fa-spinner fa-spin'></i>");
                // 		datafile.start();
                // 	}
                // });

            },

            FilesAdded: function(up, files) {
                console.log(files);
                plupload.each(files, function(file) {
                    // console.log(file);
                    if (file_allowd.length > 0) {
                        var allowedTypes = file_allowd;
                        if(!allowedTypes.includes(file.type)){
                            alert(file_allowd_err);
                        } else {
                            $("#"+error_disp_class).removeClass("text-danger");
                            $("#"+error_disp_class).removeClass("text-success");
                            $("#"+browse_button).hide();
                            // $(".sub_btn").hide();
                            datafile.start();
                        }
                    } else {
                        $("#"+error_disp_class).removeClass("text-danger");
                        $("#"+error_disp_class).removeClass("text-success");
                        $("#"+browse_button).hide();
                        // $(".sub_btn").hide();
                        datafile.start();
                    }
                    // document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });
            },

            UploadProgress: function(up, file, response) {
                // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                // $(".sendfile_btn").html(file.percent+"%");
                if (file.percent == 100) {
                    setTimeout(() => {
                        // $("#uploadFile").show();
                    }, 500);
                } else {
                    // $("#uploadFile").html(file.percent+"%");
                    $("#"+error_disp_class).html(file.percent+"%");
                }
            },

            Error: function(up, err) {
                // document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
                $("#"+browse_button).show();
                alert("Fail to upload file");
            },

            FileUploaded: function(up, file, info) {
                // Called when file has finished uploading
                $("#"+browse_button).show();
                // $(".sub_btn").show();
                console.log(info.response);
                var response = JSON.parse(info.response);
                console.log(response);
                if (response.error == 0) {
                    $("#"+error_disp_class).removeClass("text-danger");
                    $("#"+error_disp_class).addClass("text-success");
                    $("#"+error_disp_class).html(response.file_name);
                    $("#"+folder_name).val(response.file_name).trigger("change");
                } else {
                    $("#"+error_disp_class).removeClass("text-success");
                    $("#"+error_disp_class).addClass("text-danger");
                    $("#"+error_disp_class).html(response.message);
                    alert(response.message);
                }
                // info.response
                // log('[FileUploaded] File:', file, "Info:", info);
            },
        }
    });

    return datafile;
}


load_uploader("id_proof_file_btn", "id_proof_file_error", "id_proof_file", user_url+"/upload_file").init();
load_uploader("address_proof_file_btn", "address_proof_file_error", "address_proof_file", user_url+"/upload_file").init();
load_uploader("right_to_work_in_uk_file_btn", "right_to_work_in_uk_file_error", "right_to_work_in_uk_file", user_url+"/upload_file").init();
load_uploader("prescribing_certificate_file_btn", "prescribing_certificate_file_error", "prescribing_certificate_file", user_url+"/upload_file").init();
load_uploader("clinical_diploma_file_btn", "clinical_diploma_file_error", "clinical_diploma_file", user_url+"/upload_file").init();
load_uploader("specialities_file_btn", "specialities_file_error", "specialities_file", user_url+"/upload_file").init();
load_uploader("cppe_soap_file_btn", "cppe_soap_file_error", "cppe_soap_file", user_url+"/upload_file").init();
load_uploader("insurance_cert_file_btn", "insurance_cert_file_error", "insurance_cert_file", user_url+"/upload_file").init();
load_uploader("staff_photo_btn", "staff_photo_error", "staff_photo", user_url+"/upload_file", ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'], "Please select image file.").init();
load_uploader("pathway_certificate_file_btn", "pathway_certificate_file_error", "pathway_certificate_file", user_url+"/upload_file").init();
load_uploader("dbs_certificate_file_btn", "dbs_certificate_file_error", "dbs_certificate_file", user_url+"/upload_file").init();
load_uploader("cv_btn", "cv_error", "cv", user_url+"/upload_file").init();
// datafile.init();