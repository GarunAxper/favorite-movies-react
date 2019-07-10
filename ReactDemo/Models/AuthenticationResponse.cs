using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDemo.Models
{
    public class AuthenticationResponse
    {
        public AuthenticationResponse(string email, string username)
        {
            Email = email;
            Username = username;
        }

        public string Email { get; set; }
        public string Username { get; set; }
    }
}
