package com.example.webdev.services;

import com.example.webdev.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    private List<Widget> widgetList = new ArrayList<Widget>();

    {
        Widget w1 = new Widget(123l, "60496f50ecea170017b583ed", "HEADING", 1, "welcome to widget list 123");
        Widget w2 = new Widget(234l, "ABC123", "PARAGRAPH", 1, "lorem ipsum");
        Widget w3 = new Widget(456l, "ABC456", "HEADING", 2, "welcome to widget list 456");
        Widget w4 = new Widget(789l, "ABC456", "PARAGRAPH", 1, "lorem ipsum");
        Widget w5 = new Widget(999l, "ABC456", "PARAGRAPH", 1, "lorem ipsum");

        widgetList.add(w1);
        widgetList.add(w2);
        widgetList.add(w3);
        widgetList.add(w4);
        widgetList.add(w5);
    }

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        widget.setId((new Date()).getTime());
        widgetList.add(widget);
        return widget;
    }

    public List<Widget> findAllWidgets() {
        return widgetList;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> ws = new ArrayList<Widget>();
        for(Widget w: widgetList) {
            if(w.getTopicId().equals(topicId)){
                ws.add(w);
            }
        }
        return ws;
    }

    public Integer deleteWidget(Long id) {
        int index = -1;
        for(int i =0; i<widgetList.size(); i++) {
            if(widgetList.get(i).getId().equals(id)){
                index = i;
                widgetList.remove(index);
                return 1;
            }
        }
        return -1;
    }

    public Integer updateWidget(Long id, Widget widget) {
        for(int i =0; i<widgetList.size(); i++) {
            if(widgetList.get(i).getId().equals(id)){
                widgetList.set(i, widget);
                return 1;
            }
        }
        return -1;
    }
}

