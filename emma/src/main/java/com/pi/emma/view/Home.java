package com.pi.emma.view;

import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Color;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.RenderingHints;

import javax.swing.JDesktopPane;
import javax.swing.GroupLayout;
import javax.swing.GroupLayout.Alignment;
import javax.swing.JButton;
import javax.swing.LayoutStyle.ComponentPlacement;
import java.awt.event.ActionListener;
import javax.swing.Timer;
import java.awt.event.ActionEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pi.emma.view.buttons.BotaoEstilizadoAzul;

import javax.swing.border.*;

public class Home extends JFrame{

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Home home = new Home();
					home.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	/**
	 * Launch the application.
	 */
	public Home() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		Color normalColor = new Color(70, 130, 180);
		Color pressedColor = normalColor.darker();
		
		this.setBackground(new Color(60, 60, 60));
		this.setTitle("Emma");
		this.setBounds(100, 100, 771, 525);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.getContentPane().setLayout(new BorderLayout(0, 0));
		
		JPanel pnlBase = new JPanel();
		pnlBase.setBackground(new Color(60, 60, 60));
		this.getContentPane().add(pnlBase);
		pnlBase.setLayout(new BorderLayout(0, 0));
		
		JPanel pnlTop = new JPanel();
		pnlTop.setBackground(new Color(60, 60, 60));
		pnlTop.setPreferredSize(new Dimension(10, 120));
		pnlBase.add(pnlTop, BorderLayout.NORTH);
		pnlTop.setLayout(new BorderLayout(0, 0));
		
		JPanel pnlRight = new JPanel();
		pnlRight.setPreferredSize(new Dimension(300, 10));
		pnlRight.setBackground(new Color(60, 60, 60));
		pnlBase.add(pnlRight, BorderLayout.EAST);
		
		JPanel pnlBottom = new JPanel();
		pnlBottom.setBackground(new Color(60, 60, 60));
		pnlBottom.setPreferredSize(new Dimension(10, 75));
		pnlBase.add(pnlBottom, BorderLayout.SOUTH);
		
		JPanel pnlLeft = new JPanel();
		pnlLeft.setBackground(new Color(60, 60, 60));
		pnlLeft.setPreferredSize(new Dimension(40, 10));
		pnlBase.add(pnlLeft, BorderLayout.WEST);
		
		JPanel pnlCenter = new JPanel();
		pnlCenter.setBackground(new Color(60, 60, 60));
		pnlBase.add(pnlCenter, BorderLayout.CENTER);
		pnlCenter.setBorder(BorderFactory.createLineBorder(Color.gray));
		pnlCenter.setLayout(new GridLayout(1, 0, 0, 0));
		
		JDesktopPane desktopPane = new JDesktopPane();
		desktopPane.setBackground(new Color(60, 60, 60));
		pnlCenter.add(desktopPane);
		
		JPanel panel = new JPanel();
		panel.setBackground(new Color(60, 60, 60));
		panel.setPreferredSize(new Dimension(100, 40));
		pnlTop.add(panel, BorderLayout.SOUTH);
		
		JButton btnRecente = new JButton("Recente");
		btnRecente.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnRecente.setName("recente");
		btnRecente.setBackground(new Color(60, 60, 60));
		btnRecente.setForeground(new Color(13, 110, 253));
		btnRecente.setPreferredSize(new Dimension(80, 30));
		btnRecente.setFont(new Font("Inria Sans", Font.BOLD, 20));
		BotaoEstilizadoAzul.estilizarBotaoToggle(btnRecente);
		
		JButton btnNome = new JButton("Nome");
		btnNome.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnNome.setPreferredSize(new Dimension(20, 21));
		btnNome.setName("name");
		btnNome.setBackground(new Color(60, 60, 60));
		btnNome.setForeground(new Color(13,110, 253));
		btnNome.setFont(new Font("Inria Sans", Font.BOLD, 20));
		BotaoEstilizadoAzul.estilizarBotaoToggle(btnNome);
		
		JButton btnTags = new JButton("Tags");
		btnTags.setPreferredSize(new Dimension(20, 21));
		btnTags.setName("name");
		
		JButton btnCltpj = new JButton("CLT/PJ");
		btnCltpj.setPreferredSize(new Dimension(20, 21));
		btnCltpj.setName("name");
		
		JButton btnSalario = new JButton("Salário");
		btnSalario.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnSalario.setPreferredSize(new Dimension(20, 21));
		btnSalario.setName("name");
		
		JButton btnCustos = new JButton("Custos");
		btnCustos.setPreferredSize(new Dimension(20, 21));
		btnCustos.setName("name");
		
		GroupLayout gl_panel = new GroupLayout(panel);
		gl_panel.setHorizontalGroup(
			gl_panel.createParallelGroup(Alignment.LEADING)
				.addGroup(gl_panel.createSequentialGroup()
					.addGap(36)
					.addComponent(btnRecente, GroupLayout.PREFERRED_SIZE, 45, Short.MAX_VALUE)
					.addPreferredGap(ComponentPlacement.RELATED)
					.addComponent(btnNome, GroupLayout.PREFERRED_SIZE, 47, Short.MAX_VALUE)
					.addPreferredGap(ComponentPlacement.RELATED)
					.addComponent(btnTags, GroupLayout.PREFERRED_SIZE, 48, Short.MAX_VALUE)
					.addPreferredGap(ComponentPlacement.RELATED)
					.addComponent(btnCltpj, GroupLayout.PREFERRED_SIZE, 43, Short.MAX_VALUE)
					.addPreferredGap(ComponentPlacement.RELATED)
					.addComponent(btnSalario, GroupLayout.PREFERRED_SIZE, 53, Short.MAX_VALUE)
					.addPreferredGap(ComponentPlacement.RELATED)
					.addComponent(btnCustos, GroupLayout.PREFERRED_SIZE, 51, Short.MAX_VALUE)
					.addGap(404))
		);
		gl_panel.setVerticalGroup(
			gl_panel.createParallelGroup(Alignment.TRAILING)
				.addGroup(gl_panel.createSequentialGroup()
					.addGroup(gl_panel.createParallelGroup(Alignment.BASELINE)
						.addComponent(btnRecente, GroupLayout.PREFERRED_SIZE, 32, GroupLayout.PREFERRED_SIZE)
						.addComponent(btnNome, GroupLayout.PREFERRED_SIZE, 30, Short.MAX_VALUE))
					.addGap(8))
				.addGroup(Alignment.LEADING, gl_panel.createSequentialGroup()
					.addComponent(btnTags, GroupLayout.DEFAULT_SIZE, 30, Short.MAX_VALUE)
					.addContainerGap())
				.addGroup(Alignment.LEADING, gl_panel.createSequentialGroup()
					.addComponent(btnCltpj, GroupLayout.DEFAULT_SIZE, 31, Short.MAX_VALUE)
					.addContainerGap())
				.addGroup(Alignment.LEADING, gl_panel.createSequentialGroup()
					.addComponent(btnSalario, GroupLayout.DEFAULT_SIZE, 30, Short.MAX_VALUE)
					.addContainerGap())
				.addGroup(Alignment.LEADING, gl_panel.createSequentialGroup()
					.addComponent(btnCustos, GroupLayout.DEFAULT_SIZE, 30, Short.MAX_VALUE)
					.addContainerGap())
		);
		panel.setLayout(gl_panel);
	}
}
