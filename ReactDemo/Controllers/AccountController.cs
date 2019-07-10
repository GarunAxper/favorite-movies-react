using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReactDemo.ViewModels;
using ReactDemo.Models;
using Microsoft.AspNetCore.Http;

namespace ReactDemo.Controllers
{

    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.Username };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, false);
                    return Ok(new JsonResult(new AuthenticationResponse(user.Email, user.UserName)));
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        var errorKey = error.Code.Contains("Password") ? "Password" : error.Code.Contains("Email") ? "Email" : "Username";
                        ModelState.AddModelError(errorKey, error.Description);
                    }
                }
            }
            return Ok(ModelState);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByEmailAsync(model.EmailOrUsername);
                user = user ?? await _userManager.FindByNameAsync(model.EmailOrUsername);
                

                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);
                    if (result.Succeeded)
                    {
                        //HttpContext.Session.SetString("Aaaa", "bbbbb");
                        return Ok(new JsonResult(new AuthenticationResponse(user.Email, user.UserName)));
                    }
                    return BadRequest("Incorrect Email or Password");
                }
                return BadRequest("User doesn`t exists");
            }
            return BadRequest(ModelState);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCurrentUser()
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            return Ok(user);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
