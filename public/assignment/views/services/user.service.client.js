
(function () {
    angular
        .module("WebAppMaker")
        .factory("LoginService",loginService);
    function loginService($http) {
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",
                lastName: "Wonder", email: "alice.wonder@gmail.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",
            email:"marley.b@gmail.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",
            email:"gracia.c@yahoo.in"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",
            email:"jannunzi@gmail.com"}
        ];

        var api={
            "findByCredential" : findByCredential,
            "findById" : findById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "deleteUser":deleteUser,
            "updateUser":updateUser,
            "logout" : logout,
            "register" : register,
            "checkLogin" : checkLogin
        };
        return api;
        
        
        function logout() {
            return $http.post("/api/logout")
        }
        
        function register(user) {
            return $http.post("/api/register",user)
        }
        
        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function findById(userId) {
            return $http.get("/api/user/123")
        }
        
        
        function findByCredential(user) {
            return $http.post('/api/login',user)
           //return $http.get("/api/user?username="+username+"&password="+password)
        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
        function createUser(user) {
            return $http.post("/api/user",user);
        }
        
        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function updateUser(userId,user) {
           return $http.put("/api/user/"+userId,user);

        }
    }
})();