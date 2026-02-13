/*
* Greedy Navigation (height-based, 2-row variant)
*
* Based on http://codepen.io/lukejacksonn/pen/PwmwWV
*
* Instead of checking if items overflow in width (single row),
* this allows flex-wrap to flow items into up to 2 rows.
* Items are moved to the hamburger only when the container
* exceeds the height of 2 rows.
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $vlinks_persist_tail = $vlinks.children("*.persist.tail");
var $hlinks = $('#site-nav .hidden-links');

function getMaxHeight() {
  // Measure the height of a single row by looking at the first
  // visible <li>. Two rows = 2x that height plus a small tolerance
  // for padding/margins.
  var $firstItem = $vlinks.children('li').first();
  if ($firstItem.length === 0) return Infinity;
  var singleRowHeight = $firstItem.outerHeight(true);
  // Allow 2 rows: twice the row height plus a few px tolerance
  return singleRowHeight * 2 + 4;
}

function updateNav() {
  var maxHeight = getMaxHeight();

  // Reserve right space for the hamburger button when it's visible
  if (!$btn.hasClass('hidden')) {
    $vlinks.css('padding-right', ($btn.outerWidth(true) + 10) + 'px');
  } else {
    $vlinks.css('padding-right', '');
  }

  // Phase 1: move items to hamburger if the flex container is too tall
  // (i.e. wrapping to more than 2 rows)
  while ($vlinks.height() > maxHeight && $vlinks.children("*:not(.persist)").length > 0) {
    // Move the last non-persist item to the hidden list
    $vlinks.children("*:not(.persist)").last().prependTo($hlinks);
    // Show the hamburger button
    $btn.removeClass("hidden");
    // Re-reserve space for the now-visible button
    $vlinks.css('padding-right', ($btn.outerWidth(true) + 10) + 'px');
    // Recalculate max height in case layout shifted
    maxHeight = getMaxHeight();
  }

  // Phase 2: try to bring items back from hamburger if there's room
  while ($hlinks.children().length > 0) {
    var $item = $hlinks.children().first();

    // Temporarily move the item back to visible-links
    if ($vlinks_persist_tail.length > 0) {
      $item.insertBefore($vlinks_persist_tail.first());
    } else {
      $item.appendTo($vlinks);
    }

    // Recalculate in case a new row changed things
    maxHeight = getMaxHeight();

    if ($vlinks.height() > maxHeight) {
      // Doesn't fit within 2 rows — move it back to hamburger
      $item.prependTo($hlinks);
      break;
    }
  }

  // Hide the hamburger button if the hidden list is empty
  if ($hlinks.children().length === 0) {
    $btn.addClass('hidden');
    $btn.removeClass('close');
    $hlinks.addClass('hidden');
    $vlinks.css('padding-right', '');
  }

  // Keep counter updated
  $btn.attr("count", $hlinks.children().length);

  // Update masthead height and the body/sidebar top padding
  var mastheadHeight = $('.masthead').height();
  $('body').css('padding-top', mastheadHeight + 'px');
  if ($(".author__urls-wrapper button").is(":visible")) {
    $(".sidebar").css("padding-top", "");
  } else {
    $(".sidebar").css("padding-top", mastheadHeight + "px");
  }
}

// Window listeners
$(window).on('resize', function () {
  updateNav();
});
screen.orientation.addEventListener("change", function () {
  updateNav();
});

$btn.on('click', function (e) {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
  e.stopPropagation();
});

// Close hamburger menu when clicking outside of it
$(document).on('click', function (e) {
  if (!$hlinks.hasClass('hidden') && !$(e.target).closest('.hidden-links').length) {
    $hlinks.addClass('hidden');
    $btn.removeClass('close');
  }
});

updateNav();
