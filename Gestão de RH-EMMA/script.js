document.addEventListener('DOMContentLoaded', function() {
    let employees = [];
    
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebarLinks = document.querySelectorAll('.sidebar li');
    const employeeModal = document.getElementById('employee-modal');
    const addEmployeeBtn = document.getElementById('add-employee');
    const closeModalBtn = document.querySelector('.close-modal');
    const employeeForm = document.getElementById('employee-form');
    const employeesTable = document.getElementById('employees-table').getElementsByTagName('tbody')[0];
    
    const mockEmployees = [
        { id: 1, name: "João Silva", email: "joao@empresa.com", department: "TI", position: "Desenvolvedor", salary: 5500, hireDate: "2020-05-15" },
        { id: 2, name: "Maria Souza", email: "maria@empresa.com", department: "RH", position: "Analista de RH", salary: 4800, hireDate: "2019-11-20" },
        { id: 3, name: "Carlos Oliveira", email: "carlos@empresa.com", department: "Vendas", position: "Gerente de Vendas", salary: 7200, hireDate: "2018-03-10" },
        { id: 4, name: "Ana Costa", email: "ana@empresa.com", department: "Financeiro", position: "Contadora", salary: 6100, hireDate: "2021-01-05" }
    ];
    
    init();
    
    function init() {
        employees = [...mockEmployees];
        
        updateStats();
        
        loadEmployeesTable();
        
        setupEventListeners();
    }
    
    function setupEventListeners() {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                sidebarLinks.forEach(l => l.classList.remove('active'));
                
                this.classList.add('active');
                
                tabContents.forEach(content => content.classList.remove('active'));
                
                const tabId = this.querySelector('a').getAttribute('href').substring(1);
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        addEmployeeBtn.addEventListener('click', () => {
            employeeModal.style.display = 'flex';
        });
        
        closeModalBtn.addEventListener('click', () => {
            employeeModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === employeeModal) {
                employeeModal.style.display = 'none';
            }
        });
        
        employeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addEmployee();
        });
    }
    
    function updateStats() {
        document.getElementById('total-employees').textContent = employees.length;
        document.getElementById('pending-vacations').textContent = '3'; 
        document.getElementById('birthdays').textContent = '2'; 
        const activities = [
            "Novo funcionário contratado: João Silva",
            "Maria Souza solicitou férias",
            "Atualização no departamento de Vendas",
            "Relatório mensal gerado"
        ];
        
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = '';
        
        activities.forEach(activity => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${activity}</span><small>Hoje</small>`;
            activityList.appendChild(li);
        });
    }
    
    function loadEmployeesTable() {
        employeesTable.innerHTML = '';
        
        employees.forEach(employee => {
            const row = employeesTable.insertRow();
            
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>${formatDate(employee.hireDate)}</td>
                <td>
                    <button class="btn-action edit" data-id="${employee.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${employee.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
        });
        
        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                editEmployee(parseInt(this.getAttribute('data-id')));
            });
        });
        
        document.querySelectorAll('.btn-action.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteEmployee(parseInt(this.getAttribute('data-id')));
            });
        });
    }
    
    function addEmployee() {
        const newEmployee = {
            id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
            name: document.getElementById('employee-name').value,
            email: document.getElementById('employee-email').value,
            department: document.getElementById('employee-department').value,
            position: document.getElementById('employee-position').value,
            salary: parseFloat(document.getElementById('employee-salary').value),
            hireDate: document.getElementById('employee-hire-date').value
        };
        
        employees.push(newEmployee);
        
        loadEmployeesTable();
        updateStats();
        
        employeeModal.style.display = 'none';
        employeeForm.reset();
        
        alert('Funcionário adicionado com sucesso!');
    }
    
    function editEmployee(id) {
        const employee = employees.find(e => e.id === id);
        if (!employee) return;
        
        document.getElementById('employee-name').value = employee.name;
        document.getElementById('employee-email').value = employee.email;
        document.getElementById('employee-department').value = employee.department;
        document.getElementById('employee-position').value = employee.position;
        document.getElementById('employee-salary').value = employee.salary;
        document.getElementById('employee-hire-date').value = employee.hireDate;
        
        employeeModal.style.display = 'flex';
        
        employeeForm.onsubmit = function(e) {
            e.preventDefault();
            updateEmployee(id);
        };
    }
    
    function updateEmployee(id) {
        const index = employees.findIndex(e => e.id === id);
        if (index === -1) return;
        
        employees[index] = {
            id: id,
            name: document.getElementById('employee-name').value,
            email: document.getElementById('employee-email').value,
            department: document.getElementById('employee-department').value,
            position: document.getElementById('employee-position').value,
            salary: parseFloat(document.getElementById('employee-salary').value),
            hireDate: document.getElementById('employee-hire-date').value
        };
        
        loadEmployeesTable();
        updateStats();
        
        employeeModal.style.display = 'none';
        employeeForm.reset();
        
        employeeForm.onsubmit = function(e) {
            e.preventDefault();
            addEmployee();
        };
        
        alert('Funcionário atualizado com sucesso!');
    }
    
    function deleteEmployee(id) {
        if (confirm('Tem certeza que deseja excluir este funcionário?')) {
            employees = employees.filter(e => e.id !== id);
            
            loadEmployeesTable();
            updateStats();
            
            alert('Funcionário excluído com sucesso!');
        }
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
});