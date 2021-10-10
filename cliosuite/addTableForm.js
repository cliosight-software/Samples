
window.MicrositesApp = window.MicrositesApp || {};

$(document).ready(function(){
    
    MicrositesApp.clickedAddFormButton = function(self){
        
        var clickedAddFormButton = self;
        var formContainerName = 
                $(self).closest('.formContainer').length > 0 ? 
                    $(self).closest('.formContainer').attr('ms-form-prefix')+'[form]['+$(clickedAddFormButton).attr('ms-form-id')+']['+$(clickedAddFormButton).attr('ms-click-count')+']'
                        : 
                    '[form]['+$(clickedAddFormButton).attr('ms-form-id')+']['+$(clickedAddFormButton).attr('ms-click-count')+']';
            
        var formDom = $('<div class="formContainer" ms-form-prefix="'+formContainerName+'">'+decodeURIComponent($(self).attr('ms-form'))+'</div>');
        
            var formContainerNameSplited = formContainerName.split(/\[(.+)/);
            formContainerNameSplited = formContainerNameSplited[1];
            var formContainerNameSplited = formContainerNameSplited.split(/\](.+)/);
            formContainerNameSplited.splice(-1,1);
            var modifiedFormContainerNameSplited = formContainerNameSplited.join('');
        
        
        formDom.find('input,select').each(function(){
            var currentName = $(this).attr('name');
            var currentNameSplited = currentName.split(/\[(.+)/);
            currentNameSplited.splice(-1,1);
            currentNameSplited[0] = '['+currentNameSplited[0]+']';
            var modifiedCurrentName = currentNameSplited.join('[');
            $(this).attr('name',modifiedFormContainerNameSplited
                    +modifiedCurrentName);
        });
        formDom.append('<input type="hidden" name="'+modifiedFormContainerNameSplited+'[joinCriteria]" value="'+$(self).attr('ms-join-criteria')+'" />');
        formDom.insertBefore(self);
        $(clickedAddFormButton).attr('ms-click-count', parseInt($(clickedAddFormButton).attr('ms-click-count'))+1);
        $('.ms_addFormButton', formDom).click(function(e){
            e.preventDefault();
            MicrositesApp.clickedAddFormButton(this);
        });
        setTimeout(function(){
            $('.tableRowIds', formDom).each(function () {
                MicrositesApp.initiateSelect2(this);
            });                
        });
        
        $('[ms-field-type=table_select]',formDom).each(function(){
            MicrositesApp.initiateSelect2(this);
        });
        
        
        return formDom;
        
    };
    
    $('.ms_addFormButton').click(function(e){
        
        e.preventDefault();
        var formDom = MicrositesApp.clickedAddFormButton(this);
    });
});
