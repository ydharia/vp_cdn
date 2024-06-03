    function add_more_time(day_name, start_time="", end_time="")
    {
        var html = $("#time_div_html").html();
        html = html.replaceAll('{{day_name}}', day_name);
        html = html.replaceAll('{{start_time}}', start_time);
        html = html.replaceAll('{{end_time}}', end_time);
        $(".day_div_"+day_name).find(".row").append(html);
    }

    function add_to_webx_group(obj, sid, cid)
    {
        var sdata = {sid, cid, type:'add'};
        $.ajax({
            dataType: 'json',
            type:'post',
            url:base_url+'admin/webx_group',
            data:sdata,
            catch:false,
            success: function (result) {
                if (result.error == 0) {
                    $(obj).parent().remove();
                    toastr.success(result.message, 'Success');
                } else {
                    toastr.error(result.message, 'Fail');
                }
            }
        });
    }

    function calc_hours(day)
    {
        var totalMinutes = 0;

        // Get all the start time and end time inputs
        var startTimeInputs = document.getElementsByClassName(day+"_start_time");
        var endTimeInputs = document.getElementsByClassName(day+"_end_time");

        // Loop through the inputs and calculate the total minutes
        for (var i = 0; i < startTimeInputs.length; i++) {
            var startTime = startTimeInputs[i].value;
            var endTime = endTimeInputs[i].value;

            // Skip calculation if either start time or end time is empty
            if (!startTime || !endTime) {
                continue;
            }

            // Convert start time and end time to Date objects
            var startDate = new Date("2000-01-01 " + startTime);
            var endDate = new Date("2000-01-01 " + endTime);

            // Calculate the difference in minutes
            var diffMinutes = (endDate - startDate) / (1000 * 60);

            // Add the difference to the total minutes
            totalMinutes += diffMinutes;
        }

        // Calculate total hours and minutes
        var hours = Math.floor(totalMinutes / 60);
        var minutes = totalMinutes % 60;
        minutes = minutes.toString().padStart(2, '0');

        // Display the total hours
        $("."+day+"_week_hours").val(hours + ":" + minutes);
        // console.log("Total hours: " + hours + ":" + minutes);
        calculate_total_hours();
    }

    function calculate_total_hours()
    {
        var totalMinutes = 0;
        // Get all the start time and end time inputs
        var parentElement = document.getElementById("days_want_time_wise_div");
        var startTimeInputs = parentElement.querySelectorAll('[class*="_start_time"]');
        var endTimeInputs = parentElement.querySelectorAll('[class*="_end_time"]');

        console.log("startTimeInputs", startTimeInputs);
        console.log("endTimeInputs", endTimeInputs);
        // Loop through the inputs and calculate the total minutes
        for (var i = 0; i < startTimeInputs.length; i++) {
            var startTime = startTimeInputs[i].value;
            var endTime = endTimeInputs[i].value;

            console.log("startTime", startTime);
            console.log("endTime", endTime);
            // Skip calculation if either start time or end time is empty
            if (!startTime || !endTime) {
                continue;
            }

            // Convert start time and end time to Date objects
            var startDate = new Date("2000-01-01 " + startTime);
            var endDate = new Date("2000-01-01 " + endTime);

            // Calculate the difference in minutes
            var diffMinutes = (endDate - startDate) / (1000 * 60);

            // Add the difference to the total minutes
            totalMinutes += diffMinutes;
        }

        // Calculate total hours and minutes
        var hours = Math.floor(totalMinutes / 60);
        var minutes = totalMinutes % 60;
        minutes = minutes.toString().padStart(2, '0');

        // Display the total hours
        console.log(hours + ":" + minutes);
        $(".total_week_hours").html(hours + ":" + minutes);
    }


    function remove_time(obj, day)
    {
        $(obj).parent().parent().prev().remove();
        $(obj).parent().parent().remove();
        calc_hours(day);
    }

    function edit_future_reply(fm_id)
    {
        $("#fm_id").val(fm_id);
        $("#message").summernote("code", future_reply_id_wise[fm_id].message);
        $("#create_time").val(future_reply_id_wise[fm_id].create_time_textbox);
        $("#file_name").val(future_reply_id_wise[fm_id].file_name);
        if (future_reply_id_wise[fm_id].file_name != "" && future_reply_id_wise[fm_id].file_name != null) {
            attach_files = future_reply_id_wise[fm_id].file_name.split(",");    
        } else {
            attach_files = [];
        }
        $("#filelist").html("");
        if (attach_files.length > 0) {
            $.each(attach_files, function(key, value) {
                if (value != "") {
                    $("#filelist").append('<div id="file_'+key+'">'+value+' <a href="javascript:void(0);" onclick="remove_file(\'file_'+key+'\', \''+value+'\')" class="text-danger remove">Remove</a></div>');
                }
            });
        }
        if (!$("#collapseOne1").hasClass("show")) {
            $("#accordion").find("a").trigger("click");
        }
    }
    
    function get_messages(page_no="", per_page=10, prepend=false)
    {
        if (page_no == "") {
            $("#load_more_div").hide();
            page_no_load = load_page;
        } else {
            page_no_load = page_no;
        }
        var sdata = {st_id:st_id, page: page_no_load, per_page};
        $.ajax({
            dataType:'json',
            type:'post',
            url:base_url+'admin/get_ticket_messages',
            data:sdata,
            catch: false,
            success: function (result) {
                if (result.error == 0) {
                    attachments_id_wise = result.attachments_id_wise;
                    $.each(result.messages, function (index, data) {
                        if (prepend) {
                            $("#messages_div").prepend(data.html);
                        } else {
                            $("#messages_div").append(data.html);
                        }
                    });
                    $.each(result.messages_id_wise, function (key, data) {
                        messages_id_wise[key] = data;
                    });
                    if (page_no == "") {
                        if (result.next != 1) {
                            $("#load_more_div").hide();
                        } else {
                            $("#load_more_div").show();
                        }
                    }
                    load_page++;
                }
            },
            error: function (request, status, error) {
                console.log(request.responseText);
                console.log(error);
                console.log(status);
            }
        });
    }

    function mark_first_meeting_done()
    {
        $("#first_meeting_modal").modal("show");
    }

    $(document).ready(function (){
        get_messages();
    });

    function create_it_ticket(id="")
    {
        if (id != "") {
            new_html = messages_id_wise[id]+"<p>----------</p>"+IT_mail_default;
            $('#it_ticket_message').summernote('code', new_html);
        } else {
            $('#it_ticket_message').summernote('code', IT_mail_default);
        }
        $("#it_ticket_modal").modal("show");
    }

    $('#it_ticket_form').on('submit', function (e) {
        e.preventDefault(); 
    }).validate({
        rules: {
            it_ticket_priority: {
                required: true
            },
            message: {
                required: true
            },
        },
        messages: {
            it_ticket_priority: {
                required: "Please select priority."
            },
            message: {
                required: "Please enter message."
            },
        },
        errorPlacement: function(error, element) {
            if ( $("#"+element.attr("name")+"_error").length != 0) {
                $("#"+element.attr("name")+"_error").html(error);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            if ($('#it_ticket_message').summernote('isEmpty')) {
                $("#it_ticket_message_error").addClass("text-danger");
                $("#it_ticket_message_error").html("Please enter message");
            } else {
                $("#it_ticket_message_error").html("");
                $("#it_ticket_message_error").removeClass("text-danger");
                $(".add_design_btn").attr("disabled", "disabled");
                form.submit();
            }
        }
    });

    function delete_attachment(obj, file, stm_id, type='ticket')
    {
        Swal.fire({
            title: "Are you sure?",
            text: 'You want to delete attachment? File will be deleted from server also',
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#34c38f",
            cancelButtonColor: "#ff3d60",
            confirmButtonText: "Yes"
        }).then(function (t) {
            if (t.value) {
                var sdata = {file: all_attachments[file], type, id:stm_id};
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url:base_url+'admin/delete_attachment',
                    data: sdata,
                    catch: false,
                    success: function (result) {
                        if (result.error == 0) {
                            $(obj).parent().remove();
                            toastr.success(result.message, 'Success');
                        } else {
                            toastr.error(result.message, 'Fail');
                        }
                    }
                });
            }
        });
    }
    function save_old_status(val)
    {
        current_status = val;
    }

    function change_ticket_status(val)
    {
        Swal.fire({
            title: "Are you sure?",
            text: 'You want to change status to '+val+'?',
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#34c38f",
            cancelButtonColor: "#ff3d60",
            confirmButtonText: "Yes"
        }).then(function (t) {
            if (t.value) {
                window.location.href = base_url+'admin/viewticket?id='+st_id+'&change_status='+val;
            } else {
                $("#select_ticket_status").val(current_status);
            }
        });
    }

    
    function add_to_member_note(id)
    {
        if (typeof support_notes_id_wise[id] != 'undefined') {
            Swal.fire({
                title: "Are you sure?",
                text: 'You want to add note?',
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                var sdata = {sid:sid, sn_id:"0", note_text: support_notes_id_wise[id].note_text};
                    $.ajax({
                        dataType: 'json',
                        type: 'post',
                        data: sdata,
                        url: base_url+'admin/managestaffnotes',
                        catch: false,
                        success: function (result) {
                            if (result.error == 0) {
                                toastr.success(result.message, 'Success');
                            } else {
                                toastr.error(result.message, 'Fail');
                            }
                        }
                    });
                }
            });
        } else {
            toastr.error("Note not found", 'Fail');
        }
    }

    function assign_color(color, st_id, obj)
    {
        $.ajax({
            dataType:'json',
            type:'post',
            data:{color:color, st_id:st_id},
            url:base_url+'admin/assign_color',
            catch:false,
            success: function (result) {
                if (result.error == 0) {
                    toastr.success(result.message, 'Success');
                } else {
                    toastr.error(result.message, 'Fail');
                }
            }
        });
    }
    function allow_staff_holiday(val, sid)
    {
        if (val == 1) {
            msg = "You want to enable sooner holiday";
        } else {
            msg = "You want to disable sooner holiday";
        }
        Swal.fire({
            title: "Are you sure?",
            text: msg,
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#34c38f",
            cancelButtonColor: "#ff3d60",
            confirmButtonText: "Yes"
        }).then(function (t) {
            if (t.value) {
                var sdata = {allow_sooner_holidays:val, sid:sid};
                $.ajax({
                    dataType:'json',
                    type:'get',
                    data:sdata,
                    url:base_url+'admin/managestaff',
                    catch:false,
                    success: function (result) {
                        if (result.error == 0) {
                            if (val == 1) {
                                $("#sooner_holiday_btn").html('<button class="btn btn-warning waves-effect waves-light" onclick="allow_staff_holiday(\'00\', '+sid+')">Disable Sooner Holidays</button>');
                            } else {
                                $("#sooner_holiday_btn").html('<button class="btn btn-primary waves-effect waves-light" onclick="allow_staff_holiday(\'1\', '+sid+')">Allow Sooner Holidays</button>');
                            }
                            toastr.success(result.message, 'Success');
                        }
                    }
                });
            }
        });
    }
    function clam_ticket()
    {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to clam ticket?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#34c38f",
            cancelButtonColor: "#ff3d60",
            confirmButtonText: "Yes"
        }).then(function (t) {
            if (t.value) {
                $(".clam_ticket").attr("disabled", "disabled");
                var html = '<p style="font-size:20px">Dear '+$(".owner_name").text()+',</p>';
                html += '<p>'+aname+' is working on your ticket you will receive a response shortly.</p>';
                html += '<p>If you need to escalate this please ring the office.</p>';
                html += '<p>Best Regards,</p>';
                html += '<p>Virtual Pharmacist</p>';
                $("#message").summernote("code", html);
                $(".reply_btn").trigger("click");
            }
        });
    }
    function send_webx_login(want_confirm=true)
    {
        if (want_confirm) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to send webx login details?",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                    send_webx_mail(staff_webx_username, staff_webx_password);
                }
            });
        }
    }

    function send_webx_mail(webx_username, webx_password)
    {
        var html = '<p style="font-size:20px">Hello '+staff_name+',</p>';
        html += `<p>Here are your Webex login credentials that you will need once you receive your laptop. These credentials will be used when you make calls or communicate with the team.</p>`;
        html += '<br>';
        html += '<p>Username: <b><u>'+webx_username+'</u></b><br>Password: <b><u>'+webx_password+'</u></b></p>';
        html += '<p><b>To learn more about Webex click here: <a href="'+base_url+'/team/faqread?faq=169">'+base_url+'/team/faqread?faq=169</a></b></p>';
        html += '<p><b>Once logged in, can you please make a test call from Webex to see if the call functioning works and the number is also ringing withheld. If not please let us know so we can resolve this before you start.</b></p><br>';
        html += '<p><b>Please don\'t hesitate to let me know if you have any issues.</b></p>';
        html += '<p style="margin-bottom:0px;">Many thanks,</p>';
        html += '<p>Virtual Pharmacist Team</p>';
        $("#message").summernote("code", html);
        $(".reply_btn").trigger("click");
    }

    function holiday_mail()
    {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to send upcomming holiday mail?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#34c38f",
            cancelButtonColor: "#ff3d60",
            confirmButtonText: "Yes"
        }).then(function (t) {
            if (t.value) {
                var html = '<p style="font-size:20px">Hello '+staff_name+',</p>';
                html += `<p>we request that you inform us of any upcoming annual leave so we can plan this in with the practice, click <a href="`+base_url+`team/leavenotification">here</a> or reply with these dates.</p>`;
                html += '<p style="margin-bottom:0px;">Many thanks,</p>';
                html += '<p>Virtual Pharmacist Team</p>';
                $("#message").summernote("code", html);
                $(".reply_btn").trigger("click");
            }
        });
    }
    
    function send_first_meeting_organiser()
    {
        if ($("#google_event_date").val() != "" && $("#google_event_start").val() != "") {

            var myDate = new Date($("#google_event_date").val()+" "+$("#google_event_start").val());
            var meeting_date = ""+myDate.toDateString()+" "+myDate.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
            Swal.fire({
                title: "Are you sure?",
                text: "You want to Send Meeting Invitation?",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                    var html = '<p style="font-size:20px">Hello '+staff_name+',</p>';
                    html += `<p>As we progress with your onboarding process we would like to schedule a video call to ensure you have everything required to access the systems on your first day. This should ideally be scheduled for 7 days prior to your start date. Please login to the meeting via the '<a href="`+base_url+`team/video_conference">video conference</a>' tab on the panel, or by clicking this link: <a href="https://virtualpharmacist.whereby.com/meeting">https://virtualpharmacist.whereby.com/meeting</a> A laptop shall be sent to you approximately 14 days prior to your start date. Please attend the video conference using this laptop. You will also need the provided smart card reader, and your smart card.</p>`;
                    html += '<b>I currently have availability in my diary for <u>'+meeting_date+'</u> in a free slot. <span style="color:red;">Please confirm if this would be suitable</span></b>';
                    html += '<p>I shall look forward to meeting with you :)</p>';
                    html += '<p style="margin-bottom:0px;">Many thanks,</p>';
                    html += '<p>VP Team</p>';
                    $("#message").summernote("code", html);
                    $(".reply_btn").trigger("click");
                }
            });
        }
    }
    
    var old_val_aid = "";
    function save_old_value(val)
    {
        old_val_aid = val;
    }
    function assign_ticket(aid, st_id, obj)
    {
        $.ajax({
            dataType:'json',
            type:'post',
            data:{aid:aid, st_id:st_id},
            url:base_url+'admin/assign_ticket',
            catch:false,
            success: function (result) {
                if (result.error == 0) {
                    toastr.success(result.message, 'Success');
                } else {
                    if (result.error == 2) {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "Tickect already assigned to admin, Would you like to transfer ticket to other admin?",
                            icon: "warning",
                            showCancelButton: !0,
                            confirmButtonColor: "#34c38f",
                            cancelButtonColor: "#ff3d60",
                            confirmButtonText: "Yes"
                        }).then(function (t) {
                            if (t.value) {
                                $.ajax({
                                    dataType:'json',
                                    type:'post',
                                    data:{aid:aid, st_id:st_id},
                                    url:base_url+'admin/assign_ticket?confirm=1',
                                    catch:false,
                                    success: function (result2) {
                                        toastr.options = {
                                            "closeButton": true,
                                            "debug": false,
                                            "newestOnTop": false,
                                            "progressBar": false,
                                            "positionClass": "toast-top-right",
                                            "preventDuplicates": false,
                                            "onclick": null,
                                            "showDuration": 300,
                                            "hideDuration": 1000,
                                            "timeOut": 5000,
                                            "extendedTimeOut": 1000,
                                            "showEasing": "swing",
                                            "hideEasing": "linear",
                                            "showMethod": "fadeIn",
                                            "hideMethod": "fadeOut"
                                        }
                                        if (result2.error == 0) {
                                            toastr.success(result2.message, 'Success');
                                        } else {
                                            toastr.error(result2.message, 'Fail');
                                        }
                                    }
                                });
                            } else {
                                obj.value = old_val_aid;
                            }
                        });
                    }
                    toastr.error(result.message, 'Fail');
                }
            }
        });
    }

    $(document).ready(function(){
        var sdata = {page_url:base_url+'admin/viewticket?id='+st_id};
        $.ajax({
            dataType:'json',
            type:'post',
            url:base_url+'admin/get_admin_page_history',
            data:sdata,
            catch:true,
            success: function (result) {
                console.log(result);
                if (result.error == 0) {
                    $.each(result.heatmap, function (index, data){
                        if ($(".visit_time_"+data.aid).length > 0 && $(".visit_time_"+data.aid).html().trim() == "") {
                            $(".visit_time_"+data.aid).html("("+data.visit_time+")");
                        }
                    });
                }
            }
        });
    });
    if (is_welcome_ticket) {

        function view_note()
        {
            $(".application_note_div").toggle(300);
        }

        function view_checklist()
        {
            $(".application_checklist_div").toggle(300);
            var checklist_iframe = document.getElementById("checklist_iframe");
            // setTimeout(() => {
            set_load(checklist_iframe);
            // }, 5000);
        }
        
        function change_status(app_id, status_name, message, obj)
        {
            Swal.fire({
                title: "Are you sure?",
                text: message,
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                    $.ajax({
                        dataType:'json',
                        type:'get',
                        url:base_url+'admin/board?app_id='+app_id+'&'+status_name+'=1',
                        catch: false,
                        success: function(result) {
                            if (result.error == 0) {
                                $("."+status_name).removeClass('text-danger');
                                $("."+status_name).addClass('text-success');
                                toastr.success(result.message, 'Success');
                                if (status_name == "webx_group_added") {
                                    $(".webx_group_added").removeClass("text-danger");
                                    $(".webx_group_added").addClass("text-success");
                                    $("<button class='btn btn-sm btn-success mr-1 mt-1'>"+result.disp_text+"</button>").insertAfter(obj);
                                } else if (status_name == "dr_login_completed_status") {
                                    $(".practice_login_status").html('(Done)');
                                    $(".practice_login_status").removeClass('text-warning');
                                    $(".practice_login_status").addClass('text-success');
                                } else if (status_name == "no_holiday_status") {
                                    $("<button class='btn btn-sm btn-warning mt-4 mr-1'>"+result.disp_text+"</button>").insertAfter(obj);
                                } else if (status_name == "induction_done_status") {
                                    $("<button class='btn btn-sm btn-info mt-1 mr-1'>"+result.disp_text+"</button>").insertAfter(obj);
                                } else {
                                    $("<button class='btn btn-sm btn-success mt-4 mr-1'>"+result.disp_text+"</button>").insertAfter(obj);
                                }
                                $(obj).remove();
                            }
                        }
                    });
                }
            }); 
        }

        function send_dr_emails(sid, app_id, dr_id="")
        {
            $(".dr_list_div").html("");
            if (typeof schedule_sid_wise[sid] != "undefined") {
                var dr_included = [];
                $.each(schedule_sid_wise[sid], function (index, data) {
                    if (!dr_included.includes(data.dr_id)) {
                        if (dr_id != "" && dr_id != data.dr_id) {
                            return;
                        }
                        dr_included.push(data.dr_id);
                        var html = $(".list_drs_html").html();
                        html = html.replaceAll("{{dr_name}}", data.dr_name);
                        html = html.replaceAll("{{manager_email}}", data.manager_email);
                        html = html.replaceAll("{{leave_warning_email}}", data.leave_warning_email);
                        html = html.replaceAll("{{other_emails}}", data.other_emails);
                        html = html.replaceAll("{{dr_id}}", data.dr_id);
                        html = html.replaceAll("{{dr_email}}", data.dr_email);
                        html = html.replaceAll("{{summernote}}", "summernote");
                        var sdata = {sid, dr_id:data.dr_id, app_id};
                        $.ajax({
                            dataType:'json',
                            type:'post',
                            data:sdata,
                            url:base_url+'admin/get_login_email_html',
                            async:false,
                            catch:false,
                            success: function (result) {
                                if (result.error == 0) {
                                    html = html.replaceAll("{{subject}}", result.subject);
                                    html = html.replaceAll("{{mail_body}}", result.emailhtml);
                                    $("#dr_email_modal").modal("show");
                                } else {
                                    alert(result.message);
                                }
                            }
                        });
                        $(".dr_list_div").append(html);
                    }
                });
                $(".summernote").summernote({
                    height: 300,
                    minHeight: null,
                    maxHeight: null,
                    focus: !0,
                    callbacks: {
                        // onPaste: function(e) {
                        //     var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('text/plain');
                        //     e.preventDefault();
                        //     document.execCommand('insertHTML', false, bufferText);
                        // }
                    }
                });
                $("#email_app_id").val(app_id);
                $("#email_sid").val(sid);
                
                
            } else {
                alert("Not Schedule found");
            }
        }

        function hscn_request(obj, app_id, sid, name)
        {
            Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to make request to HSCN?",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                    var sdata = {app_id, sid, name};
                    $.ajax({
                        dataType: 'json',
                        type: 'post',
                        data: sdata,
                        url: base_url+'admin/hscn_request',
                        catch: false,
                        success: function (result) {
                            if (result.error == 0) {
                                $(".hscn_title_change").html('(Requested <span class="text-primary" style="cursor:pointer;" onclick="window.open(\''+base_url+'admin/view_email?id='+result.disp_eid+'\')">#E'+result.disp_eid+'</span>)');
                                $(".hscn_title_change").removeClass("text-danger");
                                $(".hscn_title_change").addClass("text-success");
                                if ($("#req_hscn_username").length > 0) {
                                    $("#req_hscn_username").val(result.username);
                                    $("#req_hscn_password").val(result.password);
                                }

                                var html = '<p style="font-size:20px">Hello '+staff_name+',</p>';
                                html += `<p>Here are your VPN/HSCN/Forticlient login details that you will need upon receiving your laptop:</p>`;
                                html += '<br>';
                                html += '<p>Username: <b><u>'+result.username+'</u></b><br>Password: <b><u>'+result.password+'</u></b></p>';
                                html += '<p>For more information on this, please visit: <a href="https://virtualpharmacist.co.uk/gettingstarted">Getting started</a></p>';
                                html += '<p>Thank you,</p>';
                                $("#message").summernote("code", html);
                                $(".reply_btn").trigger("click");

                                // toastr.success(result.message, 'Success');
                                // $(obj).parent().html('<a href="https://panel.virtualpharmacist.co.uk/admin/view_email?id='+result.eid+'" target="_blank">#E'+("0000" + result.eid).slice(-4)+'</a>');
                            } else {
                                toastr.error(result.message, 'Fail');
                            }
                        }
                    });
                }
            });
        }

        function webx_request(obj, app_id, email_id, name, isp, sid)
        {
            Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to make request to WebX?",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                    var sdata = {app_id, email_id, name, isp, sid};
                    $.ajax({
                        dataType: 'json',
                        type: 'post',
                        data: sdata,
                        url: base_url+'admin/webx_request',
                        catch: false,
                        success: function (result) {
                            if (result.error == 0) {
                                $(".webx_title_change").html('(Requested <span class="text-primary" style="cursor:pointer;" onclick="window.open(\''+base_url+'admin/view_email?id='+result.disp_eid+'\')">#E'+result.disp_eid+'</span>)');
                                $(".webx_title_change").removeClass("text-danger");
                                $(".webx_title_change").addClass("text-success");
                                $(".webx_send_login_details_btn").removeAttr("disabled");
                                if ($("#req_webx_username").length > 0) {
                                    $("#req_webx_username").val(result.username);
                                    $("#req_webx_password").val(result.password);
                                }

                                var html = '<p style="font-size:20px">Hello '+staff_name+',</p>';
                                html += `<p>Here are your Webex login credentials that you will need once you receive your laptop. These credentials will be used when you make calls or communicate with the team.</p>`;
                                html += '<br>';
                                html += '<p>Username: <b><u>'+result.username+'</u></b><br>Password: <b><u>'+result.password+'</u></b></p>';
                                html += '<p>For more information on this, please visit: <a href="https://virtualpharmacist.co.uk/gettingstarted">Getting started</a></p>';
                                html += '<p>Thank you,</p>';
                                $("#message").summernote("code", html);
                                $(".reply_btn").trigger("click");
                                // send_webx_mail(result.username, result.password);
                                // toastr.success(result.message, 'Success');
                                // $(obj).parent().html('<a href="<?=base_url("admin/view_email?id=")?>'+result.eid+'" target="_blank">#E'+("0000" + result.eid).slice(-4)+'</a>');
                            } else {
                                toastr.error(result.message, 'Fail');
                            }
                        }
                    });
                }
            });
        }

        $("#it_laptop_request_form").submit(function(e){
            e.preventDefault();
        });

        function it_laptop_request(msg_text="Are you sure you want to make request to IT Team?")
        {
            if (msg_text == "") {
                msg_text = "Are you sure you want to make request to IT Team?";
            }
            Swal.fire({
                title: "Are you sure?",
                text: msg_text,
                icon: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#ff3d60",
                confirmButtonText: "Yes"
            }).then(function (t) {
                if (t.value) {
                    var btn_txt = $(".laptop_req_btn").html();
                    $(".laptop_req_btn").attr("disabled", "disabled");
                    $(".laptop_req_btn").html("Please Wait...")
                    var sdata = $("#it_laptop_request_form").serialize();
                    $.ajax({
                        dataType: 'json',
                        type: 'post',
                        data: sdata,
                        url: base_url+'admin/it_laptop_request',
                        catch: false,
                        success: function (result) {
                            if (result.error == 0) {
                                var html = '<p style="font-size:20px">Hello '+$(".owner_name").text()+',</p>';
                                html += '<p>Your laptop has now been dispatched and should be with you in the next 5 - 6 working days.</p>';
                                html += '<p>We ask that when you receive it you please turn it on and set your password (If you are asked for an old password just leave this field blank).</p>';
                                html += '<p>You can read more about the laptop here: <a href="https://virtualpharmacist.co.uk/gettingstarted">Getting Start</a></p>';
                                html += '<p>Best Regards,</p>';
                                html += '<p>Virtual Pharmacist</p>';
                                $("#message").summernote("code", html);
                                $(".reply_btn").trigger("click");
                                // location.reload();
                                // $('<a class="btn btn-warning form-control" href="<?=base_url("admin/view_email")?>?id='+result.eid+'" target="_blank">Requested #E'+("0000" + result.eid).slice(-4)+'</a>').insertAfter(obj);
                                // $(obj).remove();
                                toastr.success(result.message, 'Success');
                                // $(obj).parent().html('<a href="https://panel.virtualpharmacist.co.uk/admin/view_email?id='+result.eid+'" target="_blank">#E'+("0000" + result.eid).slice(-4)+'</a>');
                            } else {
                                $(".laptop_req_btn").removeAttr("disabled");
                                $(".laptop_req_btn").html(btn_txt);
                                toastr.error(result.message, 'Fail');
                            }
                        }
                    });
                }
            });
        }

        function check_reply(obj, subject, eid)
        {
            var sdata = {subject, eid:eid, span_href:true};
            $.ajax({
                dataType:'json',
                type:'post',
                url:base_url+'admin/check_email_reply',
                data:sdata,
                catch:false,
                success: function (result) {
                    if (result.error == 0) {
                        var html = $(obj).html();
                        // html = html.replaceAll("Requested", "Completed");
                        $(obj).html(html);
                        $(obj).append(" <br>Reply From: ");
                        $.each(result.span_eids, function (index, val) {
                            $(obj).append(val);
                        });
                        $(obj).removeClass("text-warning");
                        $(obj).addClass("text-success");
                    } else {
                    }
                }
            });
            
        }

        $("input[type='radio'][name='systems_know']").change(function(e) {
            if ($(this).val() == "Other") {
                $("#systems_know_other").show();
                systems_know_other_req = true;
            } else {
                $("#systems_know_other").hide();
                systems_know_other_req = false;
            }
            $("#systems_know_other_error").html("");
            if (e.originalEvent !== undefined)
            {
                find_matching_requirement();
            }
        });

        $("input[type='radio'][name='ip']").change(function(e) {
            if ($(this).val() == "Other") {
                $("#ip_other_text").show();
                ip_req = true;
            } else {
                $("#ip_other_text").hide();
                ip_req = false;
            }
            $("#ip_other_error").html("");
            if (e.originalEvent !== undefined)
            {
                find_matching_requirement();
            }
        });

        $("input[type='radio'][name='cppe_nation_pathway']").change(function() {
            if ($(this).val() == "Other") {
                $("#cppe_nation_pathway_other_text").show();
                cppe_nation_pathway_req = true;
            } else {
                $("#cppe_nation_pathway_other_text").hide();
                cppe_nation_pathway_req = false;
            }
            $("#cppe_nation_pathway_other_error").html("");
        });
        $("input[type='radio'][name='acp_clinical_diploma']").change(function() {
            if ($(this).val() == "Other") {
                $("#acp_clinical_diploma_other_text").show();
                acp_clinical_diploma_req = true;
            } else {
                $("#acp_clinical_diploma_other_text").hide();
                acp_clinical_diploma_req = false;
            }
            $("#acp_clinical_diploma_other_error").html("");
        });

        $("input[type='radio'][name='nhs_card']").change(function() {
            if ($(this).val() == "Other") {
                $("#nhs_card_other").show();
                nhs_card_other_req = true;
            } else {
                $("#nhs_card_other").hide();
                nhs_card_other_req = false;
            }
            $("#nhs_card_other_error").html("");
        });
        $("input[type='radio'][name='nhs_email']").change(function() {
            if ($(this).val() == "Other") {
                $("#nhs_email_other").show();
                nhs_email_other = true;
            } else {
                $("#nhs_email_other").hide();
                nhs_email_other = false;
            }
            $("#nhs_email_other_error").html("");
        });
        $("select[name='hear_from']").change(function() {
            if ($(this).val() == "Other") {
                $(".hear_other_div").show();
                hear_req_other = true;
            } else {
                $(".hear_other_div").hide();
                hear_req_other = false;
            }
            $("#hear_from_other_error").html("");
        });

        function verify_schedule_added()
        {
            var drs = $("#dr_ids").val();
            var schedule_added_but_not_in_list = [];
            console.log(staff_drs_ids);
            console.log(drs);
            $.each(staff_drs_ids, function(key, dr_id) {
                if (drs.includes(dr_id)) {
                    $(".dr_div_"+dr_id).first().find("label > b").html('<a class="text-success" target="_blank" href="'+base_url+'admin/calendarviewschedule?dr_id='+dr_id+'&sid='+update_selected_sid+'">(Schedule Added)</a>');
                } else {
                    schedule_added_but_not_in_list.push(dr_id);
                }
            });
            $.each(drs, function(key, dr_id) {
                if (!staff_drs_ids.includes(dr_id)) {
                    $(".dr_div_"+dr_id).first().find("label > b").html('<a class="text-danger" target="_blank" href="'+base_url+'admin/calendarviewschedule?dr_id='+dr_id+'&sid='+update_selected_sid+'">(Schedule Pending)</a>');
                }
            });
            $("#pending_schedule_add").html("");
            var pending_list = [];
            $.each(schedule_added_but_not_in_list, function (key, dr_id) {
                if (typeof staff_drs_names[dr_id] !== 'undefined') {
                    pending_list.push('<b><a target="_blank" class="text-danger" href="'+base_url+'admin/calendarviewschedule?dr_id='+dr_id+'&sid='+update_selected_sid+'">'+staff_drs_names[dr_id]+'</a></b>');
                }
            });
            if (pending_list.length > 0) {
                $("#pending_schedule_add").html("<p class='text-danger mb-0'>Having Schedule but not in list: "+pending_list.join(", ")+"</p>");
            }
        }

        if (is_quiz_application) {
            function update_app()
            {
                $('input[name="staff_start_date_confirm"][value="'+applications.staff_start_date_confirm+'"]').prop('checked', applications.staff_start_date_confirm == 1 ? true : false);
                $('input[name="refresher_needed"][value="'+applications.refresher_needed+'"]').prop('checked', applications.refresher_needed == 1 ? true : false);
                $('input[name="staff_start_date"]').val(applications.staff_start_date);
                $('input[name="app_id"]').val(applications.app_id);
                $('input[name="ratting"]').val(applications.ratting);
                $('input[name="isp"]').val(applications.isp);
                if (applications.start_time != null && applications.start_time != "") {
                    $('input[name="start_time"]').val(applications.start_time.replaceAll(" ", "T"));
                }
                if (applications.end_time != null && applications.end_time != "") {
                    $('input[name="end_time"]').val(applications.end_time.replaceAll(" ", "T"));
                }
        
                $('input[name="note"]').val(applications.note);
                $('#note').summernote("code", applications.note);
        
                var instance = $('input[name="ratting"]').data("ionRangeSlider");
                instance.update({
                    from: applications.ratting
                });
        
                $('#days_want').val([]).select2( { closeOnSelect: false } );
                if (applications.days_want != "" && applications.days_want != null) {
                    $('#days_want').val(applications.days_want.split(",")).select2( { closeOnSelect: false } );
                }
        
                $("#days_want_time_wise_div").html("");
                if (applications.days_want_time_wise != "" && applications.days_want_time_wise != null) {
                    days_want_time_wise = JSON.parse(applications.days_want_time_wise);
                    $.each(days_want_time_wise, function(day, vals){
                        start = typeof vals.start_time != "undefined" ? vals.start_time : "";
                        end = typeof vals.end_time != "undefined" ? vals.end_time : "";
                        if (typeof vals.week_hours !== 'undefined') {
                            generate_day_wise(day, start, end, vals.week_hours, "time");
                        } else {
                            generate_day_wise(day, start, end, "", "time");
                        }
                        setTimeout(() => {
                            calc_hours(day);
                        }, 300);
                    });
                }

                if (applications.cid != "0") {
                    $('#cid').val(applications.cid.split(",")).select2({
                        closeOnSelect: false,
                    }).trigger("change");
                }
                if (applications.dr_ids != null && applications.dr_ids != "") {
                    $('#dr_ids').val(applications.dr_ids.split(",")).select2({
                        closeOnSelect: false,
                    });
                }

                $("#dr_hours_wise_div").html("");
                if (applications.drs_hours != "" && applications.drs_hours != null) {
                    drs_hours = JSON.parse(applications.drs_hours);
                    $.each(drs_hours, function(dr_id, vals){
                        hrs = typeof vals.hrs != "undefined" ? vals.hrs : "";
                        generate_dr_hours(dr_id, hrs);
                    });
                }
                verify_schedule_added();

            }
        } else {
            function update_app()
            {
                if (applications.form.toLowerCase() == "tech") {
                    $(".tech_hide").hide();
                    ip_req = false;
                    cppe_nation_pathway_req = false;
                    acp_clinical_diploma_req = false;
                } else {
                    $(".tech_hide").show();
                    ip_req = true;
                    cppe_nation_pathway_req = true;
                    acp_clinical_diploma_req = true;
                }

                $('input[name="app_id"]').val(applications.app_id);
                $('input[name="name"]').val(applications.name);

                var position_interested = applications.position_interested.split(",");
                $.each(position_interested, function(key, val){
                    $('input[name="position_interested[]"][value="'+val+'"]').prop("checked", true);
                });
                $('input[name="experience"]').val(applications.experience);

                $('input[name="cppe_nation_pathway"][value="'+applications.cppe_nation_pathway+'"]').prop('checked', true);
                $('input[name="cppe_nation_pathway"][value="'+applications.cppe_nation_pathway+'"]').trigger("change");
                $('input[name="cppe_nation_pathway_other"]').val(applications.cppe_nation_pathway_other);

                $('input[name="acp_clinical_diploma"][value="'+applications.acp_clinical_diploma+'"]').prop('checked', true);
                $('input[name="acp_clinical_diploma"][value="'+applications.acp_clinical_diploma+'"]').trigger("change");
                $('input[name="acp_clinical_diploma_other"]').val(applications.acp_clinical_diploma_other);

                $('input[name="nhs_card"][value="'+applications.nhs_card+'"]').prop('checked', true);
                $('input[name="nhs_card"][value="'+applications.nhs_card+'"]').trigger("change");
                $('input[name="nhs_card_other"]').val(applications.nhs_card_other);

                $('input[name="nhs_email"][value="'+applications.nhs_email+'"]').prop('checked', true);
                $('input[name="nhs_email"][value="'+applications.nhs_email+'"]').trigger("change");
                $('input[name="nhs_email_other"]').val(applications.nhs_email_other);

                $('input[name="cv"]').val(applications.cv);
                $('input[name="expected_rate"]').val(applications.expected_rate);
                $("#cv_error").html('<a target="_blank" href="'+base_url+'uploads/user_applications/'+applications.cv+'">'+applications.cv+'</a>');

                $('input[name="role"]').val(applications.role);
                $('input[name="isp"]').val(applications.isp);

                $('select[name="hear_from"]').val(applications.hear_from).trigger("change");
                $('input[name="hear_from_other"]').val(applications.hear_from_other);

                $('input[name="start_time"]').val(applications.start_time.replaceAll(" ", "T"));
                $('input[name="end_time"]').val(applications.end_time.replaceAll(" ", "T"));

                $('input[name="ratting"]').val(applications.ratting);
                var instance = $('input[name="ratting"]').data("ionRangeSlider");
                instance.update({
                    from: applications.ratting
                });
                
                $('input[name="gphc_no"]').val(applications.gphc_no);
                $('input[name="week_hours"]').val(applications.week_hours);
                
                $('input[name="staff_start_date_confirm"][value="'+applications.staff_start_date_confirm+'"]').prop('checked', applications.staff_start_date_confirm == 1 ? true : false);
                $('input[name="refresher_needed"][value="'+applications.refresher_needed+'"]').prop('checked', applications.refresher_needed == 1 ? true : false);
                $('input[name="systems_know"][value="'+applications.systems_know+'"]').prop('checked', true);
                $('input[name="systems_know"][value="'+applications.systems_know+'"]').trigger("change");
                $('input[name="systems_know_other"]').val(applications.systems_know_other);
                $('input[name="staff_start_date"]').val(applications.staff_start_date);

                $('#days_want').val([]).select2( { closeOnSelect: false } );
                if (applications.days_want != "" && applications.days_want != null) {
                    $('#days_want').val(applications.days_want.split(",")).select2( { closeOnSelect: false } );
                }
                
                $('input[name="ip"][value="'+applications.ip+'"]').prop('checked', true);
                $('input[name="ip"][value="'+applications.ip+'"]').trigger("change");
                $('input[name="ip_other"]').val(applications.ip_other);
                if (applications.cid != "0") {
                    $('#cid').val(applications.cid.split(",")).select2({
                        closeOnSelect: false,
                    }).trigger("change");
                }
                if (applications.dr_ids != null && applications.dr_ids != "") {
                    $('#dr_ids').val(applications.dr_ids.split(",")).select2({
                        closeOnSelect: false,
                    });
                }

                $('input[name="email"]').val(applications.email);
                $('input[name="phone"]').val(applications.phone);
                $('input[name="notice_period"]').val(applications.notice_period);
                $('input[name="note"]').val(applications.note);
                $('#note').summernote("code", applications.note);
                
                // $(".form_div").show(300);
                // $('html, body').animate({
                //     scrollTop: $("#adddiv").offset().top
                // }, 500);

                $("#days_want_time_wise_div").html("");
                if (applications.days_want_time_wise != "" && applications.days_want_time_wise != null) {
                    days_want_time_wise = JSON.parse(applications.days_want_time_wise);
                    $.each(days_want_time_wise, function(day, vals){
                        start = typeof vals.start_time != "undefined" ? vals.start_time : "";
                        end = typeof vals.end_time != "undefined" ? vals.end_time : "";
                        if (typeof vals.week_hours !== 'undefined') {
                            generate_day_wise(day, start, end, vals.week_hours, "text");
                        } else {
                            generate_day_wise(day, start, end, "", "text");
                        }
                        setTimeout(() => {
                            calc_hours(day);
                        }, 300);
                    });
                }

                $("#dr_hours_wise_div").html("");
                if (applications.drs_hours != "" && applications.drs_hours != null) {
                    drs_hours = JSON.parse(applications.drs_hours);
                    $.each(drs_hours, function(dr_id, vals){
                        hrs = typeof vals.hrs != "undefined" ? vals.hrs : "";
                        generate_dr_hours(dr_id, hrs);
                    });
                }
                verify_schedule_added();
            }
        }

        function find_doctors()
        {
            // $("#dr_hours_wise_div").html("");
            ids = $("#cid").val();
            console.log(ids);
            if (ids.length > 0) {
                var html = '';
                ids.forEach(function log(id) {
                    var drs = contracts[id].dr_list;
                    drs.forEach(function log(dr) {
                        if (typeof dr_list[dr] != 'undefined'){
                            html += '<option value="'+dr+'">'+dr_list[dr]+'</option>';
                        }
                    });
                });
            } else {
                var html = '<option value="">Select Contract</option>';
            }
            var old_vals = $("#dr_ids").val();
            $("#dr_ids").html(html).val(old_vals).select2({
                closeOnSelect: false,
            }).trigger("change");
        }

        function generate_dr_hours(dr_id, hrs="")
        {
            if ($(".dr_div_"+dr_id).length == 0) {
                var html = $(".dr_hours_html").html();
                html = html.replaceAll("{{dr_id}}", dr_id);
                html = html.replaceAll("{{dr_name}}", dr_names[dr_id]);
                html = html.replaceAll("{{hrs}}", hrs);
                $("#dr_hours_wise_div").append(html);
            }
        }

        function generate_day_wise(day, start="", end="", week_hours="", type="time")
        {
            if ($(".day_div_"+day).length == 0) {
                if (start == "") {
                    // start = $("#time_start_want").val();
                    // end = $("#time_end_want").val();
                }
                var html = $(".days_html").html();
                html = html.replaceAll("{{day_name}}", day);
                html = html.replaceAll("{{week_hours}}", week_hours);
                html = html.replaceAll('type="time"', 'type="'+type+'"');
                if (typeof start == "object") {
                    html = html.replaceAll("{{start_time}}", start[0]);
                    html = html.replaceAll("{{end_time}}", end[0]);
                } else {
                    html = html.replaceAll("{{start_time}}", start);
                    html = html.replaceAll("{{end_time}}", end);
                }
                $("#days_want_time_wise_div").append(html);

                if (typeof start == "object") {
                    $.each(start, function (index, val) {
                        if (index != 0) {
                            add_more_time(day, val, end[index]);
                        }
                    });
                }
            }
        }

        $(document).ready(function(){
            
            $("#dr_ids").change(function (){
                var dr_list = [];
                $.each($(this).val(), function (key, val) {
                    generate_dr_hours(val);
                    dr_list.push("dr_div_"+val);
                });
                $("#dr_hours_wise_div > div[class*='dr_div_']").each(function(){
                    if(dr_list.some(c => [...$(this).prop('classList')].includes(c)) ) {

                    } else {
                        $(this).remove();
                    }
                });
                verify_schedule_added();
            });

            $("#days_want").change(function (){
                var day_list = [];
                $.each($(this).val(), function (key, val) {
                    generate_day_wise(val);
                    day_list.push("day_div_"+val);
                });

                $.each(day_list, function (key, val) {
                    $(this).hasClass();
                });
                $("#days_want_time_wise_div > div[class*='day_div_']").each(function(){
                    if(day_list.some(c => [...$(this).prop('classList')].includes(c)) ) {

                    } else {
                        $(this).remove();
                    }
                });
                calculate_total_hours();
            });

            setTimeout(() => {
                update_app();
            }, 1000);

            $("#application_form").validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true
                    },
                    week_hours: {
                        required: true
                    },
                    systems_know: {
                        required: true
                    },
                    systems_know_other: {
                        required: {
                            depends: function(element) {
                                return systems_know_other_req;
                            }
                        }
                    },
                    ip: {
                        required: true
                    },
                    ip_other: {
                        required: {
                            depends: function(element) {
                                return ip_req;
                            }
                        }
                    },
                    name: {
                        required: true
                    },
                    'position_interested[]': {
                        required: true
                    },
                    experience: {
                        required: true
                    },
                    cppe_nation_pathway: {
                        required: true
                    },
                    cppe_nation_pathway_other: {
                        required: {
                            depends: function(element) {
                                return cppe_nation_pathway_req;
                            }
                        }
                    },
                    acp_clinical_diploma: {
                        required: false
                    },
                    acp_clinical_diploma_other: {
                        required: {
                            depends: function(element) {
                                return acp_clinical_diploma_req;
                            }
                        }
                    },
                    expected_rate: {
                        required: true
                    },
                    nhs_card: {
                        required: true
                    },
                    nhs_card_other: {
                        required: {
                            depends: function(element) {
                                return nhs_card_other_req;
                            }
                        }
                    },
                    nhs_email: {
                        required: true
                    },
                    nhs_email_other: {
                        required: {
                            depends: function(element) {
                                return nhs_email_other;
                            }
                        }
                    },
                    start_time: {
                        required: true
                    },
                    end_time: {
                        required: true
                    },
                    isp: {
                        required: true
                    },
                },
                messages: {
                    email: {
                        required: "Please enter your email",
                        email:"Please enter valid email address"
                    },
                    phone: {
                        required: "Please enter mobile number"
                    },
                    week_hours: {
                        required: "Please enter Hours Per Week"
                    },
                    systems_know: {
                        required: "Please select systems you know"
                    },
                    systems_know_other: {
                        required: "Please enter systems you know"
                    },
                    ip: {
                        required: "Please select independent prescriber"
                    },
                    ip_other: {
                        required: "Please enter independent prescriber"
                    },
                    name: {
                        required: "Please enter name"
                    },
                    'position_interested[]': {
                        required: "Please select position(s) are you interested"
                    },
                    experience: {
                        required: "Please enter experience do you have in general practice"
                    },
                    cppe_nation_pathway: {
                        required: "Please select CPPE nation pathway"
                    },
                    cppe_nation_pathway_other: {
                        required: "Please enter CPPE nation pathway"
                    },
                    acp_clinical_diploma: {
                        required: "Please select ACP or Clinical Diploma"
                    },
                    acp_clinical_diploma_other: {
                        required: "Please enter ACP or Clinical Diploma"
                    },
                    expected_rate: {
                        required: "Please enter expected hourly rate"
                    },
                    nhs_card: {
                        required: "Please select option"
                    },
                    nhs_card_other: {
                        required: "Please enter any reason"
                    },
                    nhs_email: {
                        required: "Please select option"
                    },
                    nhs_email_other: {
                        required: "Please enter any reason"
                    },
                    start_time: {
                        required: "Please select meeting start time"
                    },
                    end_time: {
                        required: "Please select meeting end time"
                    },
                    isp: {
                        required: "Please enter ISP"
                    },
                },
                errorPlacement: function(error, element) {
                    if (element.attr("name") == "position_interested[]") {
                        $("#position_interested_error").html(error);
                    } else if ( $("#"+element.attr("name")+"_error").length != 0) {
                        $("#"+element.attr("name")+"_error").html(error);
                    } else {
                        error.insertAfter(element);
                    }
                }
            });

            $(".meeting_form").each(function (i, obj){
                $(this).validate({
                    rules: {
                        event_title: {
                            required: true
                        },
                        event_date: {
                            required: true
                        },
                        event_start: {
                            required: true
                        },
                        event_invited_admins_emails: {
                            required: true
                        },
                        event_invited_emails: {
                            required: true
                        },
                    },
                    messages: {
                        event_title: {
                            required: "Please enter event title"
                        },
                        event_date: {
                            required: "Please enter event date"
                        },
                        event_start: {
                            required: "Please enter event start time"
                        },
                        event_invited_admins_emails: {
                            required: "Please enter admin emails"
                        },
                        event_invited_emails: {
                            required: "Please enter emails"
                        },
                    },
                    errorPlacement: function(error, element) {
                        if ( $("#"+element.attr("name")+"_"+i+"_error").length != 0) {
                            $("#"+element.attr("name")+"_"+i+"_error").html(error);
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });
            });
        });
    
    }
