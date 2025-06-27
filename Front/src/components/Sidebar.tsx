import React from "react";

const Sidebar: React.FC = () => (
  <nav className="sidebar">
    <ul>
      {[
        { href: "#dashboard", icon: "fa-tachometer-alt", label: "Dashboard" },
        { href: "#funcionarios", icon: "fa-user-tie", label: "Funcionários" },
        { href: "#departamentos", icon: "fa-building", label: "Departamentos" },
        { href: "#cargos", icon: "fa-briefcase", label: "Cargos" },
        { href: "#folha", icon: "fa-file-invoice-dollar", label: "Folha de Pagamento" },
        { href: "#beneficios", icon: "fa-hand-holding-heart", label: "Benefícios" },
        { href: "#relatorios", icon: "fa-chart-bar", label: "Relatórios" },
        { href: "#configuracoes", icon: "fa-cog", label: "Configurações" }
      ].map(({ href, icon, label }) => (
        <li key={href}>
          <a href={href}><i className={`fas ${icon}`}></i> {label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;