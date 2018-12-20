{% if not (theme.duoshuo and theme.duoshuo.shortname) and not theme.duoshuo_shortname and not theme.disqus_shortname and not theme.hypercomments_id and not theme.gentie_productKey %}
  {% if theme.livere_uid %}
    <script type="text/javascript">
      (function(d, s) {
        var j, e = d.getElementsByTagName(s)[0];
        if (typeof LivereTower === 'function') { return; }
        j = d.createElement(s);
        j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
        j.async = true;
        e.parentNode.insertBefore(j, e);
      })(document, 'script');
    </script>
  {% endif %}
{% endif %}

作者：Moorez
链接：https://www.jianshu.com/p/f054333ac9e6
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。