package com.pi.emma.view.buttons;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class BotaoEstilizadoAzul {

    public static void estilizarBotaoToggle(JButton btn) {
        Color corPressionada = new Color(13, 110, 253);
        final boolean[] pressionado = {false};
        final Timer[] timer = {null};
        final int steps = 10;
        final int delay = 10;

        // Estilização visual
        btn.setContentAreaFilled(false);
        btn.setFocusPainted(false);
        btn.setOpaque(false);

        // Estilo com cantos arredondados
        btn.setUI(new javax.swing.plaf.basic.BasicButtonUI() {
            @Override
            public void paint(Graphics g, JComponent c) {
                Graphics2D g2 = (Graphics2D) g.create();
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                g2.setColor(btn.getBackground());
                g2.fillRoundRect(0, 0, btn.getWidth(), btn.getHeight(), 20, 20);
                g2.setColor(corPressionada);
                g2.drawRoundRect(0, 0, btn.getWidth() - 1, btn.getHeight() - 1, 20, 20);
                g2.dispose();
                super.paint(g, c);
            }
        });

        // Comportamento de toggle animado
        btn.addActionListener(e -> {
            if (timer[0] != null && timer[0].isRunning()) timer[0].stop();

            Color inicio = btn.getBackground();
            Color destino = pressionado[0] ? new Color(60, 60, 60) : corPressionada;
            Color destinoForeground = pressionado[0] ? corPressionada : Color.WHITE;

            timer[0] = new Timer(delay, null);
            timer[0].addActionListener(new ActionListener() {
                int step = 0;

                @Override
                public void actionPerformed(ActionEvent evt) {
                    float ratio = (float) step / steps;
                    int r = (int) (inicio.getRed() + ratio * (destino.getRed() - inicio.getRed()));
                    int g = (int) (inicio.getGreen() + ratio * (destino.getGreen() - inicio.getGreen()));
                    int b = (int) (inicio.getBlue() + ratio * (destino.getBlue() - inicio.getBlue()));
                    btn.setBackground(new Color(r, g, b));
                    btn.setForeground(destino);
                    step++;
                    if (step > steps) {
                        timer[0].stop();
                        btn.setBackground(destino);
                        btn.setForeground(destinoForeground);
                    }
                }
            });
            timer[0].start();
            pressionado[0] = !pressionado[0];
        });
    }
}