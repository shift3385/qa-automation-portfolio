import json
import os
import random
import time
from datetime import datetime

# Archivos de datos
DATA_FILE = os.path.join(os.path.dirname(__file__), 'quiz_data.json')
HISTORY_FILE = os.path.join(os.path.dirname(__file__), 'quiz_history.json')

def load_questions(filepath):
    """Carga las preguntas desde un archivo JSON."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: No se encontró el archivo de preguntas en {filepath}")
        return []
    except json.JSONDecodeError:
        print(f"Error: El archivo {filepath} no tiene un formato JSON válido.")
        return []

def save_history(run_data):
    """Guarda el resultado de la ejecución en el historial."""
    history = []
    
    # Si existe el historial previo, cargarlo
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                history = json.load(f)
        except json.JSONDecodeError:
            history = [] # Si está corrupto, empezamos de cero
            
    history.append(run_data)
    
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)
    
    print(f"\n[INFO] Resultados guardados exitosamente en: {HISTORY_FILE}")

def clear_screen():
    """Limpia la consola según el sistema operativo."""
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header(current, total, score):
    """Imprime el encabezado con el progreso y puntaje actual."""
    clear_screen()
    print("=" * 60)
    print(f"   EVALUACIÓN DE PROGRESO: QA AUTOMATION (FASE 1 & 2)")
    print("=" * 60)
    print(f" Pregunta: {current}/{total} | Puntaje Actual: {score:.1f}")
    print("-" * 60)

def ask_question(question_data, index, total, current_score):
    """
    Realiza una pregunta al usuario.
    Retorna:
    - points: Puntos obtenidos (1.0, 0.5, 0.0)
    - outcome: String descriptivo ("correct_1st", "correct_2nd", "failed")
    - duration: Tiempo en segundos que tomó responder
    """
    points = 0.0
    attempts = 0
    max_attempts = 2
    options = question_data['options']
    outcome = "failed"
    
    # Inicio del cronómetro invisible para esta pregunta
    start_time = time.time()
    
    while attempts < max_attempts:
        print_header(index, total, current_score)
        print(f"\n[?] {question_data['question']}\n")
        
        for i, opt in enumerate(options):
            print(f"   {i + 1}. {opt}")
        
        print("\n" + "-" * 60)
        if attempts == 0:
            prompt = ">> Selecciona tu respuesta (1-4): "
        else:
            prompt = ">> Incorrecto. Última oportunidad (1-4): "
            
        try:
            user_input = input(prompt)
            choice = int(user_input) - 1
            
            if 0 <= choice < len(options):
                if choice == question_data['answer']:
                    print("\n✅ ¡Correcto!")
                    if attempts == 0:
                        points = 1.0
                        outcome = "correct_1st"
                    else:
                        points = 0.5
                        outcome = "correct_2nd"
                    time.sleep(1) # Pequeña pausa visual
                    break # Salir del bucle de intentos
                else:
                    print("\n❌ Respuesta incorrecta.")
                    attempts += 1
                    time.sleep(1)
            else:
                print("\n⚠️ Por favor ingresa un número válido de opción.")
                time.sleep(1)
        except ValueError:
            print("\n⚠️ Entrada no válida.")
            time.sleep(1)
            
    # Fin del cronómetro para esta pregunta
    end_time = time.time()
    duration = end_time - start_time

    if attempts == max_attempts:
        print(f"\n💀 Se acabaron los intentos. La respuesta correcta era: {options[question_data['answer']]}")
        outcome = "failed"
        input("Presiona Enter para continuar...")

    return points, outcome, duration

def run_quiz():
    questions = load_questions(DATA_FILE)
    
    if not questions:
        return

    # 1. ALEATORIEDAD: Revolver las fichas del dominó
    random.shuffle(questions)

    total_questions = len(questions)
    score = 0.0
    detailed_results = []
    
    print("Bienvenido al Examen de Certificación de Conocimientos (Bitácora).")
    print(f"Se cargarán {total_questions} preguntas en orden ALEATORIO.")
    print("El sistema registrará tus tiempos internamente para análisis posterior.")
    input("\nPresiona Enter para comenzar...")
    
    # Inicio del cronómetro global
    global_start_time = time.time()

    for i, q in enumerate(questions, 1):
        points, outcome, duration = ask_question(q, i, total_questions, score)
        score += points
        
        # Guardar métricas de esta pregunta
        detailed_results.append({
            "question_id": q["id"],
            "category": q["category"],
            "outcome": outcome, # correct_1st, correct_2nd, failed
            "points": points,
            "duration_seconds": round(duration, 2)
        })

    # Fin del cronómetro global
    global_end_time = time.time()
    total_duration = global_end_time - global_start_time

    # Mostrar resultados en pantalla
    clear_screen()
    print("=" * 60)
    print("   RESULTADOS FINALES")
    print("=" * 60)
    percentage = (score / total_questions) * 100
    
    print(f"Preguntas Totales: {total_questions}")
    print(f"Puntaje Final:     {score:.1f} / {total_questions}")
    print(f"Rendimiento:       {percentage:.1f}%")
    
    minutes = int(total_duration // 60)
    seconds = int(total_duration % 60)
    print(f"Tiempo Total:      {minutes}m {seconds}s")
    print("-" * 60)
    
    if percentage >= 90:
        print("🏆 Calificación: EXCELENTE. Estás listo para la Fase 3.")
    elif percentage >= 75:
        print("🥇 Calificación: MUY BIEN. Conceptos sólidos.")
    elif percentage >= 60:
        print("🥈 Calificación: BIEN. Repasa los conceptos donde fallaste.")
    else:
        print("🥉 Calificación: NECESITAS REPASAR. Revisa la bitácora antes de continuar.")
        
    # Preparar datos para guardar
    run_data = {
        "timestamp": datetime.now().isoformat(),
        "total_questions": total_questions,
        "final_score": score,
        "percentage": percentage,
        "total_duration_seconds": round(total_duration, 2),
        "details": detailed_results
    }
    
    # Guardar historial
    save_history(run_data)
    print("=" * 60)

if __name__ == "__main__":
    run_quiz()