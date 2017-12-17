package com.test.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.test.event.RecursoCriadoEvent;
import com.test.model.api.entity.Usuario;
import com.test.service.UsuarioService;

@RestController
@RequestMapping
public class UsuarioResouce {

	@Autowired
	private UsuarioService usuarioService;
	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping("/api/user")
	public ResponseEntity<List<Usuario>> listarUsuarios() {

		List<Usuario> usuarios = usuarioService.buscarTodosusuarios();

		return ResponseEntity.status(HttpStatus.OK).body(usuarios);
	}

	@GetMapping("/api/user/{id}")
	public ResponseEntity<Usuario> listarUsuarioPorId(@PathVariable("id") Integer id) {

		Usuario usuario = null;
		usuario = usuarioService.buscarUsuarioPorId(id);

		return ResponseEntity.status(HttpStatus.OK).body(usuario);
	}

	@PostMapping("/api/user")
	public ResponseEntity<Usuario> salvarVisitante(@Valid @RequestBody Usuario usuario, HttpServletResponse response) {

		Usuario usuarioSalvo = usuarioService.cadastrarUsuario(usuario);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, usuarioSalvo.getId()));

		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
	}

	@PutMapping("/api/user/{id}")
	public ResponseEntity<Usuario> alterarvisitante(@Valid @RequestBody Usuario usuario, HttpServletResponse response) {

		Usuario usuarioEditado = usuarioService.atualizarUsuario(usuario.getId(), usuario);

		publisher.publishEvent(new RecursoCriadoEvent(this, response, usuarioEditado.getId()));

		return ResponseEntity.status(HttpStatus.OK).body(usuarioEditado);

	}

	@DeleteMapping("/api/user/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Integer id) {
		usuarioService.deletarUsuario(id);
	}

}
