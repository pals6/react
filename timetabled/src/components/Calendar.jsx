import Event from "./Event";
const Calendar = () => {
  return (
<div className="Calendar">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
            </tr>

        </thead>
        <tbody>
        <tr>
            <td className="time">8 AM</td>
            <Event event = 'Fancy Dinner' color= 'green' location='my fav cafe'/>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">9 AM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <Event event="Subway" color='pink' />
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">10 AM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">11 AM</td>
            <td></td>
            <td></td>
            <Event event="Golden Gate Bridge" location='Golden Gate Bridge' />
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">12 PM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">1 PM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">2 PM</td>
            <td></td>
            <td></td>
            <Event event='Pottery class' color='pink'/>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">3 PM</td>
            <Event event='Explore city' color='pink' />
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">4 PM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td className="time">5 PM</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <Event event= 'Visit Disney Land' color='blue' />
            <td></td>
        </tr>
        </tbody>

        
    </table>

</div>
)
}

export default Calendar;
