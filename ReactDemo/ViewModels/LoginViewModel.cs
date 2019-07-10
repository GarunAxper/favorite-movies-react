using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDemo.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "EmailOrUsername")]
        public string EmailOrUsername { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "RememberMe")]
        public bool RememberMe { get; set; } = false;
    }
}
