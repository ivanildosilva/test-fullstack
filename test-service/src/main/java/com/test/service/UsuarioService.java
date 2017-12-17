package com.test.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.test.model.api.entity.Usuario;
import com.test.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	public List<Usuario> buscarTodosusuarios() {
		return usuarioRepository.findAll();
	}

	public Usuario buscarUsuarioPorId(Integer id) {
		Usuario usuario = usuarioRepository.findOne(id);

		return usuario;
	}

	public void deletarUsuario(Integer id) {
		Usuario usuarioDeletado = buscarUsuarioPorId(id);
		if (usuarioDeletado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		usuarioRepository.delete(id);
	}

	public Usuario cadastrarUsuario(Usuario usuario) {

		return usuarioRepository.save(usuario);

	}

	public Usuario atualizarUsuario(Integer id, Usuario usuario) {
		Usuario usuarioSalvo = buscarUsuarioPorId(id);

		if (usuarioSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}
		BeanUtils.copyProperties(usuario, usuarioSalvo, "id");

		return usuarioRepository.save(usuarioSalvo);

	}
}
