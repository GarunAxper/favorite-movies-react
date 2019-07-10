using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDemo.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [MinLength(6, ErrorMessage = "Username must be minimum 5 char length")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string Email { get; set; }
        

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        //[Required]
        //[Compare("Password", ErrorMessage = "Passwords don`t match")]
        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm Password")]
        //public string PasswordConfirm { get; set; }
    }
}
