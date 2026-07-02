---
name: clima
description: Consulta el clima actual y el pronóstico de una ciudad o ubicación usando servicios gratuitos sin API key (wttr.in). Úsala cuando el usuario pida el clima, temperatura, pronóstico o condiciones meteorológicas de un lugar.
---

# Clima

Obtiene información meteorológica desde la terminal, sin necesidad de API key, usando el servicio `wttr.in`.

## Uso

1. Determinar la ubicación pedida por el usuario (ciudad, país, o coordenadas). Si no especifica ninguna, usar **Puente Alto** como ciudad por defecto.
2. Ejecutar la consulta con `curl` (formato de texto plano, compacto), incluyendo `%T` para obtener la hora local del lugar consultado:

```bash
curl -s "wttr.in/<ubicacion>?format=3&lang=es"
curl -s "wttr.in/<ubicacion>?format=%l:+%c+%t+(hora+local:+%T)&lang=es"
```

Ejemplos:
- `curl -s "wttr.in/Puente+Alto?format=3&lang=es"` → clima actual de la ciudad por defecto.
- `curl -s "wttr.in/Buenos+Aires?format=3&lang=es"` → clima actual resumido en una línea.
- `curl -s "wttr.in/Madrid?m&lang=es"` → reporte completo (3 días), unidades métricas.

3. Obtener la hora actual local del usuario para compararla con la hora del lugar consultado:

```bash
date "+%H:%M %Z"
```

4. Presentar ambas horas al usuario (hora en la ciudad consultada vs. hora local del usuario), indicando la diferencia horaria si es relevante.

## Formatos útiles

- `?format=3` → una línea: `Ciudad: ☀️ +25°C`
- `?format=4` → una línea con viento incluido
- `%T` en un `format` personalizado → hora local de la ubicación consultada
- `?m` → reporte completo con unidades métricas (°C, km/h)
- `?T` → sin colores ANSI (útil si se va a mostrar el texto en un archivo o log)
- `&lang=es` → respuesta en español (agregar como parámetro adicional)

Combinar parámetros con `&`, por ejemplo:

```bash
curl -s "wttr.in/Cordoba?format=4&m&lang=es"
```

## Notas

- No requiere autenticación ni API key.
- Requiere conexión a internet; si `curl` falla o no hay red, informar al usuario en vez de inventar datos.
- Para nombres de ciudad con espacios, reemplazar espacios por `+` o encerrar la URL entre comillas.
- Si el usuario no especifica ubicación, usar **Puente Alto** en vez de detección por IP.
