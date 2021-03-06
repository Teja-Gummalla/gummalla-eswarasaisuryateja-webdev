(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController)

    function FlickrImageSearchController(FlickrService,WidgetService,$routeParams,$location,$rootScope){
        var vm=this
        vm.user = $rootScope.currentUser;
        vm.userId= vm.user._id;
        vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.widgetId=$routeParams.wgid;

        vm.searchPhotos = searchPhotos
        vm.selectPhoto = selectPhoto

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget;
                })
        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                    console.log(vm.photos)

                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/flickr")
            })
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            console.log(url);
            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.widget,vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
                });
        }
    }
})();