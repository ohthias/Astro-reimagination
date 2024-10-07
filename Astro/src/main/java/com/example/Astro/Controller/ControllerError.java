package com.example.Astro.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.ServletWebRequest;

@Controller
public class ControllerError implements ErrorController {

    private ErrorAttributes errorAttributes;

    public void CustomErrorController(ErrorAttributes errorAttributes) {
        this.errorAttributes = errorAttributes;
    }

    public ControllerError(ErrorAttributes errorAttributes) {
        this.errorAttributes = errorAttributes;
    }

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        ServletWebRequest webRequest = new ServletWebRequest(request);
        var errorAttributes = this.errorAttributes.getErrorAttributes(webRequest, ErrorAttributeOptions.defaults());

        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        String errorMessage = (String) request.getAttribute("javax.servlet.error.message");

        model.addAttribute("statusCode", statusCode);
        model.addAttribute("errorMessage", errorMessage != null ? errorMessage : "Erro não especificado");

        if (statusCode != null) {
            if (statusCode == 404) {
                return "notFound"; // Redireciona para a página de erro 404
            } else if (statusCode >= 500) {
                return "erro"; // Redireciona para a página de erro genérico
            }
        }

        return "notFound"; // Página de erro genérica para outros casos
    }

    public String getErrorPath() {
        return "/error";
    }
}
